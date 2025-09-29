"use client";

import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

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
      }}
    >
      <ModalDialog
        sx={{
          maxWidth: getMaxWidth(),
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'white',
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        {showCloseButton && <ModalClose />}
        
        {title && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              level="h4" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1.25rem'
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