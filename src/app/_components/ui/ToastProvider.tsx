"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Alert from '@mui/joy/Alert';

type Toast = { id: number; message: string; severity?: 'info' | 'success' | 'warning' | 'danger' };

const ToastContext = createContext<{
 push: (message: string, severity?: Toast['severity']) => void;
} | null>(null);

export const useToast = () => {
 const ctx = useContext(ToastContext);
 if (!ctx) throw new Error('useToast must be used within ToastProvider');
 return ctx;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
 const [toasts, setToasts] = useState<Toast[]>([]);
 const push = useCallback((message: string, severity: Toast['severity'] = 'info') => {
  setToasts((cur) => [...cur, { id: Date.now() + Math.floor(Math.random() * 1000), message, severity }]);
 }, []);

 const remove = useCallback((id: number) => setToasts((cur) => cur.filter((t) => t.id !== id)), []);

 return (
  <ToastContext.Provider value={{ push }}>
   {children}
   {toasts.map((t) => (
    <Snackbar
     key={t.id}
     open
     onClose={() => remove(t.id)}
     autoHideDuration={4000}
     sx={{ position: 'fixed', bottom: 16 + (toasts.findIndex((x) => x.id === t.id) * 72), right: 16, zIndex: 1400 }}
    >
     {/* Map our severity to Joy Alert color tokens */}
     <Alert
      color={(
       {
        info: 'primary',
        success: 'success',
        warning: 'neutral',
        danger: 'danger',
       } as const
      )[t.severity ?? 'info']}
      variant="soft"
     >
      {t.message}
     </Alert>
    </Snackbar>
   ))}
  </ToastContext.Provider>
 );
}

export default ToastProvider;
