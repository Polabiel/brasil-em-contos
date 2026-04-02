"use client";

import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea";
import { Playfair_Display } from "next/font/google";

import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import UploadButton from "@/app/_components/ui/UploadButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/ToastProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type UserPayload = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserPayload | null>(null);
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const utils = api.useContext();
  const { data: me } = api.user.me.useQuery();
  const updateUser = api.user.update.useMutation({
    onSuccess() {
      void utils.user.me.invalidate();
    },
  });
  const toast = useToast();

  useEffect(() => {
    if (!me) return;
    setUser(me as UserPayload);
    setName(me.name ?? "");
    setImageUrl(me.image ?? "");
    setBio(me.bio ?? "");
    setPreview(me.image ?? null);
  }, [me]);

  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) return;
    setPreview(imageUrl ?? null);
  }, [imageUrl, selectedFile]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--cv-backgroundDefault)" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d6b2f' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            opacity: 0.6,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            level="h1"
            className={playfair.className}
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
            }}
          >
            Meu Perfil
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            borderRadius: "var(--radius-2xl)",
            border: "2px solid var(--cv-primaryLight)",
            boxShadow: "var(--shadow-lg)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={3}>
              {/* Avatar Section */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "flex-start",
                  pb: 3,
                  borderBottom: "1px solid var(--cv-borderLight)",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={preview ?? undefined}
                    alt={session?.user?.name ?? "Avatar"}
                    size="lg"
                    variant="soft"
                    sx={{
                      width: 100,
                      height: 100,
                      border: "3px solid var(--cv-brazilGreen)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  />
                </Box>
                <Stack spacing={0.5} flex={1}>
                  <Typography
                    level="h3"
                    className={playfair.className}
                    sx={{
                      color: "var(--cv-textPrimary)",
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                    }}
                  >
                    {user?.name ?? session?.user?.name ?? "Usuário"}
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: "var(--cv-textSecondary)",
                    }}
                  >
                    {user?.email ?? session?.user?.email ?? "Email não disponível"}
                  </Typography>
                </Stack>
              </Box>

              {/* Form Section */}
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      mb: 1,
                      color: "var(--cv-textPrimary)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    Nome Completo
                  </Typography>
                  <Input
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName((e.target as HTMLInputElement).value)}
                    sx={{
                      borderColor: "var(--cv-borderLight)",
                      "&:focus-within": {
                        borderColor: "var(--cv-brazilGreen)",
                        boxShadow: "0 0 0 3px rgba(13, 107, 47, 0.1)",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      mb: 1,
                      color: "var(--cv-textPrimary)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    URL da Imagem (opcional)
                  </Typography>
                  <Input
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={imageUrl}
                    onChange={(e) =>
                      setImageUrl((e.target as HTMLInputElement).value)
                    }
                    sx={{
                      borderColor: "var(--cv-borderLight)",
                      "&:focus-within": {
                        borderColor: "var(--cv-brazilGreen)",
                        boxShadow: "0 0 0 3px rgba(13, 107, 47, 0.1)",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      mb: 1,
                      color: "var(--cv-textPrimary)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    Biografia (opcional)
                  </Typography>
                  <Textarea
                    placeholder="Conte-nos um pouco sobre você..."
                    value={bio}
                    onChange={(e) =>
                      setBio((e.target as HTMLTextAreaElement).value)
                    }
                    minRows={4}
                    sx={{
                      borderColor: "var(--cv-borderLight)",
                      "&:focus-within": {
                        borderColor: "var(--cv-brazilGreen)",
                        boxShadow: "0 0 0 3px rgba(13, 107, 47, 0.1)",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      mb: 1,
                      color: "var(--cv-textPrimary)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    Carregar Foto de Perfil
                  </Typography>
                  <UploadButton
                    buttonLabel="Escolher arquivo"
                    onChange={(e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (!file) return;
                      setSelectedFile(file);
                    }}
                  />
                </Box>
              </Stack>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: "flex-end",
                  pt: 2,
                  borderTop: "1px solid var(--cv-borderLight)",
                }}
              >
                <Button
                  variant="plain"
                  onClick={() => router.back()}
                  sx={{
                    color: "var(--cv-textSecondary)",
                    "&:hover": {
                      bgcolor: "rgba(13, 107, 47, 0.05)",
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  loading={saving}
                  onClick={async () => {
                    if (saving) return;
                    setSaving(true);
                    try {
                      if (selectedFile) {
                        const fd = new FormData();
                        fd.append("name", name);
                        fd.append("image", imageUrl || "");
                        fd.append("bio", bio || "");
                        fd.append("avatar", selectedFile, selectedFile.name);
                        const res = await fetch("/api/user", {
                          method: "PATCH",
                          body: fd,
                        });
                        if (!res.ok) {
                          const txt = await res.text().catch(() => "");
                          throw new Error(`Erro ao salvar: ${res.status} ${txt}`);
                        }

                        await utils.user.me.invalidate();

                        window.dispatchEvent(new Event("avatarUpdated"));
                        toast.push("Perfil atualizado com sucesso", "success");
                      } else {
                        await updateUser.mutateAsync({ name, image: imageUrl, bio });

                        await utils.user.me.invalidate();
                        window.dispatchEvent(new Event("avatarUpdated"));
                        toast.push("Perfil atualizado com sucesso", "success");
                      }
                    } catch (err) {
                      console.error(err);
                      toast.push("Erro ao atualizar perfil", "danger");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  sx={{
                    background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, #0a5222 100%)",
                    "&:hover": {
                      boxShadow: "var(--shadow-lg)",
                    },
                  }}
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
