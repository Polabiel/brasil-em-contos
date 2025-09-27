import { NextResponse } from "next/server";
import requireAdminOrRedirect from "@/server/auth/requireAdmin";

export async function GET() {
 const res = await requireAdminOrRedirect();

 if (res instanceof NextResponse) return res;

 return NextResponse.json({ ok: true, message: 'You are admin' });
}
