import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import type { SxProps, Theme } from "@mui/system";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Slogan() {
  const sxStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { xs: 1, md: 2 },
    "--img-size": { xs: "96px", md: "200px" },
  };

  return (
    <Box className="container mx-auto px-4 py-6" sx={sxStyles}>
      <Typography
        level="h1"
        className={playfair.className}
        sx={{
          color: "black",
          fontWeight: 400,
          fontSize: "calc(var(--img-size) * 0.35)",
          lineHeight: 1,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Brasil em contos
      </Typography>

      <Image
        src="/icon.webp"
        alt="ícone"
        width={120}
        height={120}
        className="ml-2 inline-block"
        style={{ width: "var(--img-size)", height: "var(--img-size)" }}
      />
    </Box>
  );
}
