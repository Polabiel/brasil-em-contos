"use client";

import React from 'react';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import TagsList from "./TagsList";
import { api } from '@/trpc/react';
import type { RouterOutputs } from '@/trpc/react';
import CircularProgress from '@mui/joy/CircularProgress';

function TagsFetcher() {
  const { data, isLoading, error } = api.post.tags.useQuery();

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size="sm" /></Box>;
  if (error) return <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>Erro ao carregar tags</Typography>;

  const tags = (data ?? []).map((t: { tag: string; count: number }) => ({
    label: String(t.tag).replaceAll('_', ' ').toLowerCase().replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
    color: (t.tag.includes('REALISMO') || t.tag.includes('REGIONAL') ? 'primary' : 'default') as 'default' | 'primary' | 'success' | 'warning' | 'danger' | undefined,
  }));

  return <TagsList tags={tags} />;
}
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function Sidebar() {
  // fetch real authors via tRPC
  const { data: authors = [], isLoading: authorsLoading, error: authorsError } = api.author.list.useQuery();
  type AuthorItem = RouterOutputs['author']['list'][number];

  // categories removed: Tags card replaces Categories to keep Sidebar compact and data-driven

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

      {/* Book Tags (compact) - moved up to replace Categories */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography level="h4" sx={{ mb: 1, fontWeight: 600 }}>Tags</Typography>
          <Box>
            {/* Fetch tags from server via tRPC */}
            <TagsFetcher />
          </Box>
        </CardContent>
      </Card>

      {/* Featured Authors (from DB) */}
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

          {authorsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size="sm" /></Box>
          ) : authorsError ? (
            <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>Falha ao carregar autores</Typography>
          ) : (
            <Stack spacing={2}>
              {authors.length === 0 ? (
                <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>Nenhum autor encontrado</Typography>
              ) : (
                authors.map((author: AuthorItem, index: number) => (
                  <Box key={author.id}>
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
                      {author.period && (
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
                      )}
                      {author.books && author.books.length > 0 && (
                        <Typography 
                          level="body-sm" 
                          sx={{ 
                            color: 'var(--cv-textMuted70)',
                            fontSize: '0.8rem',
                            fontStyle: 'italic'
                          }}
                        >
                          {author.books.slice(0,2).map((b) => b.title).join(', ')}
                        </Typography>
                      )}
                    </Box>
                    {index < authors.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))
              )}
            </Stack>
          )}
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
