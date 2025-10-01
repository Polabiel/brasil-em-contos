import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import { Playfair_Display } from "next/font/google";
import { BookTagValues } from "@/lib/bookTags";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function CategoriasPage() {
  const categories = BookTagValues.map((tag) => ({
    value: tag,
    label: tag
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  // Group categories by type
  const literaryPeriods = categories.slice(0, 13);
  const genres = categories.slice(13, 23);
  const others = categories.slice(23);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--cv-backgroundDefault)",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            level="h1"
            className={playfair.className}
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 2,
            }}
          >
            Categorias Literárias
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "var(--cv-textMuted80)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Explore a diversidade da literatura brasileira através de diferentes
            períodos, gêneros e estilos literários.
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        {/* Literary Periods */}
        <Box sx={{ mb: 6 }}>
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 3,
            }}
          >
            Períodos Literários
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {literaryPeriods.map((category) => (
                  <Chip
                    key={category.value}
                    variant="soft"
                    color="primary"
                    sx={{
                      fontSize: "0.875rem",
                      py: 1,
                      px: 2,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(34,139,34,0.2)",
                      },
                    }}
                  >
                    {category.label}
                  </Chip>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Genres */}
        <Box sx={{ mb: 6 }}>
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 3,
            }}
          >
            Gêneros Literários
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {genres.map((category) => (
                  <Chip
                    key={category.value}
                    variant="soft"
                    color="success"
                    sx={{
                      fontSize: "0.875rem",
                      py: 1,
                      px: 2,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(34,139,34,0.2)",
                      },
                    }}
                  >
                    {category.label}
                  </Chip>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Other Categories */}
        <Box>
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 3,
            }}
          >
            Outras Categorias
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {others.map((category) => (
                  <Chip
                    key={category.value}
                    variant="soft"
                    color="warning"
                    sx={{
                      fontSize: "0.875rem",
                      py: 1,
                      px: 2,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(34,139,34,0.2)",
                      },
                    }}
                  >
                    {category.label}
                  </Chip>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
