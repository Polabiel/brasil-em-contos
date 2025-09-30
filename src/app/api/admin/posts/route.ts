import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import requireAdminOrRedirect from "@/server/auth/requireAdmin";
import { auth } from "@/server/auth";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { BookTagValues } from "@/lib/bookTags";
import type { BookTag } from "@/lib/bookTags";

export async function POST(req: NextRequest) {
  const res = await requireAdminOrRedirect();
  if (res instanceof NextResponse) return res;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No user session" }, { status: 401 });
  }

  const bodySchema = z.object({
    name: z.string().min(1, "name required"),
    tag: z.string().optional(),
    authorId: z.number().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    imageBlob: z.string().optional(),
    imageMime: z.string().optional(),
  });

  const contentType = req.headers.get("content-type") ?? "";

  const MAX_UPLOAD_BYTES = 5_000_000; // 5MB
  const MIME_WHITELIST = ["image/png", "image/jpeg", "image/webp", "image/gif"];

  let parsedBody;
  let parsed: z.infer<typeof bodySchema> | null = null;

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const nameField = form.get("name");
    const descriptionField = form.get("description");
    const contentField = form.get("content");
    const imageField = form.get("image");
    const file = form.get("imageFile");

    const toParse = {
      name: typeof nameField === "string" ? nameField : "",
      description:
        typeof descriptionField === "string" ? descriptionField : undefined,
      content: typeof contentField === "string" ? contentField : undefined,
      image: typeof imageField === "string" ? imageField : undefined,
    };

    parsedBody = bodySchema.safeParse(toParse);
    if (parsedBody.success) parsed = parsedBody.data;

    if (file && typeof (file as Blob).arrayBuffer === "function") {
      const blob = file as Blob;
      const ab = await blob.arrayBuffer();
      const buf = Buffer.from(ab);
      if (buf.length > MAX_UPLOAD_BYTES)
        return NextResponse.json(
          { error: "Image too large (max 5MB)" },
          { status: 400 },
        );
      const mime = (blob as File).type ?? null;
      if (mime && !MIME_WHITELIST.includes(mime))
        return NextResponse.json(
          { error: "Unsupported image type" },
          { status: 400 },
        );

      // build a safe parsed object if it wasn't parsed from fields
      parsed ??= {
        name: toParse.name,
        description: toParse.description,
        content: toParse.content,
        image: toParse.image,
      } as z.infer<typeof bodySchema>;
      // attach image fields as base64/mime
      (parsed as Record<string, unknown>).imageBlob = buf.toString("base64");
      (parsed as Record<string, unknown>).imageMime = mime;
    }
  } else {
    try {
      const raw = (await req.json()) as unknown;
      parsedBody = bodySchema.safeParse(raw);
      if (parsedBody.success) parsed = parsedBody.data;
    } catch {
      return NextResponse.json({ error: "invalid json" }, { status: 400 });
    }
  }

  if (!parsed?.name)
    return NextResponse.json({ error: "name required" }, { status: 400 });

  // normalize into a safe shape
  const name = String(parsed.name);
  const rawTag = (parsed as Record<string, unknown>).tag;
  const rawAuthor = (parsed as Record<string, unknown>).authorId;
  const authorId =
    typeof rawAuthor === "string" || typeof rawAuthor === "number"
      ? Number(rawAuthor)
      : null;
  const tagValue = typeof rawTag === "string" ? rawTag : null;
  const description: string | null =
    parsed.description == null ? null : String(parsed.description);
  const contentValue = parsed.content == null ? null : String(parsed.content);
  const imageStr: string | null =
    parsed.image == null ? null : String(parsed.image);
  const imageBlob: string | null =
    (parsed as Record<string, unknown>).imageBlob == null
      ? null
      : String((parsed as Record<string, unknown>).imageBlob);
  const imageMime: string | null =
    (parsed as Record<string, unknown>).imageMime == null
      ? null
      : String((parsed as Record<string, unknown>).imageMime);

  const createData: Prisma.PostUncheckedCreateInput = {
    name,
    content: contentValue ?? "",
    description: description ?? null,
    image: imageStr ?? null,
    imageBlob: imageBlob ? Buffer.from(imageBlob, "base64") : null,
    imageMime: imageMime ?? null,
    createdById: session.user.id,
  };

  if (authorId != null && !Number.isNaN(authorId)) {
    (createData as Record<string, unknown>).authorId = Number(authorId);
  }

  if (tagValue != null && BookTagValues.includes(tagValue as BookTag)) {
    // Prisma.PostUncheckedCreateInput accepts the enum literal type for tag
    (createData as unknown as Record<string, unknown>).tag =
      tagValue as BookTag;
  }

  const created = (await db.post.create({ data: createData })) as {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
  };

  const post = {
    id: created.id,
    name: created.name,
    description: created.description ?? null,
    image: created.image ?? null,
  };

  return NextResponse.json({ ok: true, post });
}
