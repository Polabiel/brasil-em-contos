"use client";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function Sidebar() {
  const featuredAuthors = [
    { name: "Machado de Assis", period: "1839-1908", works: "Dom Casmurro, O Alienista" },
    { name: "Clarice Lispector", period: "1920-1977", works: "A Hora da Estrela" },
    { name: "Guimarães Rosa", period: "1908-1967", works: "Grande Sertão: Veredas" },
  ];

  const categories = [
    { name: "Realismo", count: 24, color: "primary" },
    { name: "Modernismo", count: 18, color: "success" },
    { name: "Contemporâneo", count: 32, color: "warning" },
    { name: "Regional", count: 15, color: "danger" },
  ];

  const literaryFacts = [
    "O Brasil tem mais de 200 anos de literatura nacional rica e diversa",
    "Machado de Assis é considerado o maior escritor brasileiro",
    "A literatura brasileira reflete nossa diversidade cultural única"
  ];

  return (
    <aside className="w-full space-y-4">
      {/* About Brazilian Literature */}
      <Card 
        variant="outlined" 
        sx={{ 
          mb: 4, 
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 100%)`,
          border: '2px solid var(--cv-brazilGreen)',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                fontSize: '2rem',
                color: 'white',
                boxShadow: '0 8px 16px rgba(34,139,34,0.3)',
              }}
            >
              📖
            </Box>
          </Box>
          
          <Typography 
            level="h4"
            className={playfair.className}
            sx={{ 
              fontWeight: 600, 
              color: 'var(--cv-brazilGreen)',
              mb: 1 
            }}
          >
            Literatura Brasileira
          </Typography>
          
          <Typography 
            level="body-md" 
            sx={{ 
              color: 'var(--cv-textMuted80)', 
              lineHeight: 1.6,
              mb: 3
            }}
          >
            Explore a riqueza dos contos brasileiros, desde os clássicos até 
            as vozes contemporâneas que moldam nossa identidade literária.
          </Typography>

          <Link href="/about" style={{ textDecoration: 'none' }}>
            <Button
              variant="solid"
              size="sm"
              sx={{
                bgcolor: 'var(--cv-brazilGreen)',
                color: 'white',
                '&:hover': {
                  bgcolor: '#1e5f28',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Saiba Mais
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography 
            level="h4" 
            sx={{ 
              mb: 2, 
              color: 'var(--cv-textPrimary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <i className="fas fa-tags" style={{ color: 'var(--cv-brazilYellow)' }} />
            Gêneros Literários
          </Typography>
          
          <Stack spacing={1.5}>
            {categories.map((cat, index) => (
              <Stack 
                key={cat.name} 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
                sx={{
                  py: 1,
                  px: 1.5,
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'var(--cv-neutral50)',
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <Typography level="body-md" sx={{ color: 'var(--cv-textMuted80)' }}>
                  {cat.name}
                </Typography>
                <Chip 
                  variant="soft" 
                  size="sm"
                  sx={{
                    bgcolor: `var(--cv-${cat.color === 'primary' ? 'brazilGreen' : cat.color === 'success' ? 'successMain' : cat.color === 'warning' ? 'brazilYellow' : 'errorMain'})15`,
                    color: `var(--cv-${cat.color === 'primary' ? 'brazilGreen' : cat.color === 'success' ? 'successMain' : cat.color === 'warning' ? 'textPrimary' : 'errorMain'})`,
                    fontWeight: 600,
                  }}
                >
                  {cat.count}
                </Chip>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Featured Authors */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography 
            level="h4" 
            sx={{ 
              mb: 2, 
              color: 'var(--cv-textPrimary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <i className="fas fa-star" style={{ color: 'var(--cv-brazilYellow)' }} />
            Grandes Nomes
          </Typography>
          
          <Stack spacing={2}>
            {featuredAuthors.map((author, index) => (
              <Box key={author.name}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid transparent',
                    '&:hover': {
                      bgcolor: 'var(--cv-neutral50)',
                      borderColor: 'var(--cv-brazilGreen)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Typography 
                    level="title-sm" 
                    className={playfair.className}
                    sx={{ 
                      fontWeight: 600, 
                      color: 'var(--cv-textPrimary)',
                      mb: 0.5 
                    }}
                  >
                    {author.name}
                  </Typography>
                  <Typography 
                    level="body-xs" 
                    sx={{ 
                      color: 'var(--cv-textMuted60)', 
                      mb: 0.5,
                      fontSize: '0.75rem'
                    }}
                  >
                    {author.period}
                  </Typography>
                  <Typography 
                    level="body-sm" 
                    sx={{ 
                      color: 'var(--cv-textMuted70)',
                      fontSize: '0.8rem',
                      fontStyle: 'italic'
                    }}
                  >
                    {author.works}
                  </Typography>
                </Box>
                {index < featuredAuthors.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Literary Facts */}
      <Card 
        variant="soft"
        color="primary" 
        sx={{ 
          mb: 4,
          bgcolor: 'var(--cv-brazilGreen)08',
          border: '1px solid var(--cv-brazilGreen)20',
        }}
      >
        <CardContent>
          <Typography 
            level="h4" 
            sx={{ 
              mb: 2, 
              color: 'var(--cv-brazilGreen)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <i className="fas fa-lightbulb" />
            Curiosidades
          </Typography>
          
          <Stack spacing={2}>
            {literaryFacts.map((fact, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'var(--cv-brazilYellow)',
                    flexShrink: 0,
                    mt: 0.75,
                  }}
                />
                <Typography 
                  level="body-sm" 
                  sx={{ 
                    color: 'var(--cv-textMuted80)',
                    lineHeight: 1.5
                  }}
                >
                  {fact}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Newsletter/Follow */}
      <Card 
        variant="outlined" 
        sx={{ 
          background: `linear-gradient(135deg, var(--cv-brazilYellow)10, var(--cv-brazilGreen)10)`,
          border: '2px solid var(--cv-brazilYellow)',
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2, fontSize: '1.5rem' }}>
            📚✨
          </Box>
          
          <Typography 
            level="title-md" 
            sx={{ 
              fontWeight: 600, 
              color: 'var(--cv-textPrimary)',
              mb: 1 
            }}
          >
            Não perca nenhuma história!
          </Typography>
          
          <Typography 
            level="body-sm" 
            sx={{ 
              color: 'var(--cv-textMuted80)', 
              mb: 2,
              lineHeight: 1.5
            }}
          >
            Acompanhe as últimas publicações e descubra novos contos
          </Typography>

          <Button
            variant="solid"
            size="sm"
            fullWidth
            sx={{
              bgcolor: 'var(--cv-brazilYellow)',
              color: 'var(--cv-textPrimary)',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#e6c200',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <i className="fas fa-bell" style={{ marginRight: 6 }} />
            Seguir
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
