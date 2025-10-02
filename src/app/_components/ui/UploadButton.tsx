"use client";

import Button from '@mui/joy/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React from 'react';

type UploadButtonProps = Omit<React.ComponentProps<typeof Button>, 'component'> & {
  accept?: string;
  multiple?: boolean;
  inputName?: string;
  buttonLabel?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  component?: React.ElementType;
};

export default function UploadButton({
  accept = 'image/*',
  multiple = false,
  inputName = 'file',
  buttonLabel = 'Enviar imagem',
  onChange,
  ...buttonProps
}: UploadButtonProps) {
  return (
    <Button 
      component={buttonProps.component ?? "label"} 
      variant="solid" 
      color="primary" 
      startDecorator={<PhotoCamera />} 
      {...buttonProps}
      sx={{
        ...buttonProps.sx,
        bgcolor: 'var(--cv-brazilGreen)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.3)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.5s ease, height 0.5s ease',
        },
        '&:hover': {
          bgcolor: '#1e5f28',
          transform: 'translateY(-2px) scale(1.05)',
          boxShadow: '0 8px 20px rgba(34,139,34,0.4)',
          '&::before': {
            width: '300px',
            height: '300px',
          },
        },
        '& .MuiButton-startDecorator': {
          transition: 'transform 0.3s ease',
        },
        '&:hover .MuiButton-startDecorator': {
          transform: 'scale(1.2) rotate(15deg)',
        },
      }}
    >
      {buttonLabel}
      <input
        hidden
        name={inputName}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />
    </Button>
  );
}
