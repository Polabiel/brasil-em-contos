"use client";

import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

interface StandardModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export default function StandardModal({ 
  open, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}: StandardModalProps) {
  const getMaxWidth = () => {
    switch (size) {
      case 'sm': return 400;
      case 'md': return 600;
      case 'lg': return 800;
      default: return 600;
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backdropFilter: 'blur(8px)',
        background: 'rgba(0,0,0,0.3)',
        animation: open ? 'fadeIn 0.3s ease' : 'none',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <ModalDialog
        sx={{
          maxWidth: getMaxWidth(),
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'white',
          boxShadow: '0px 20px 60px rgba(34,139,34,0.25)',
          borderRadius: '16px',
          border: '2px solid var(--cv-neutral200)',
          position: 'relative',
          animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '@keyframes slideUp': {
            from: {
              transform: 'translateY(40px) scale(0.95)',
              opacity: 0,
            },
            to: {
              transform: 'translateY(0) scale(1)',
              opacity: 1,
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow), var(--cv-brazilBlue))',
            borderRadius: '16px 16px 0 0',
          },
        }}
      >
        {showCloseButton && (
          <ModalClose 
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2) rotate(90deg)',
                color: 'var(--cv-brazilRed)',
              },
            }}
          />
        )}
        
        {title && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              level="h4" 
              className={playfair.className}
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--cv-brazilGreen) 0%, var(--cv-brazilYellow) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.5rem',
                position: 'relative',
                paddingBottom: '8px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow))',
                  borderRadius: '2px',
                },
              }}
            >
              {title}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ 
          '& > *:not(:last-child)': { 
            mb: 2 
          } 
        }}>
          {children}
        </Box>
      </ModalDialog>
    </Modal>
  );
}