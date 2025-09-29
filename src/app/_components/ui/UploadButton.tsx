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
    <Button component={buttonProps.component ?? "label"} variant="solid" color="primary" startDecorator={<PhotoCamera />} {...buttonProps}>
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
