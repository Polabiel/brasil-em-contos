"use client";

import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import { api } from '@/trpc/react';
import type { RouterOutputs } from '@/trpc/react';
import StandardModal from '@/app/_components/ui/StandardModal';

type AuthorItem = RouterOutputs['author']['list'][number];

export default function AuthorSelector({ value, onChange }: { value?: number | null; onChange: (v: number | null) => void }) {
  const { data: authors = [], isLoading } = api.author.list.useQuery();
  const ctx = api.useContext();
  const create = api.author.create.useMutation({
    onSuccess() {
      void ctx.author.list.invalidate();
    }
  });  
  const isCreating = Boolean(create.isPending);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('');
  const [bio, setBio] = useState('');
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  return (
    <Stack spacing={1}>
      <Select
        placeholder="Autor (opcional)"
        value={typeof value === 'number' && value > 0 ? value : 0}
        onChange={(v) => {
          const raw = v as unknown;
          let n = 0;
          if (typeof raw === 'number') n = raw;
          else if (raw == null || raw === '') n = 0;
          else if (typeof raw === 'string') {
            const parsed = Number(raw);
            n = Number.isFinite(parsed) ? parsed : 0;
          } else {
            n = 0;
          }
          onChange(n > 0 ? n : null);
        }}
        size="md"
      >
        {isLoading ? <Option value={-1} disabled>Carregando...</Option> : null}
        <Option value={0}>-- Nenhum --</Option>
        {authors.map((a: AuthorItem) => (
          <Option key={a.id} value={a.id}>{a.name}{a.period ? ` — ${a.period}` : ''}</Option>
        ))}
      </Select>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>Criar novo autor</Button>

      <StandardModal 
        open={open} 
        onClose={() => setOpen(false)}
        title="Criar Novo Autor"
        size="md"
      >
        <Stack spacing={3}>
          <Input 
            placeholder="Nome do autor" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            slotProps={{ input: { ref: nameRef } }} 
            size="lg"
          />
          <Input 
            placeholder="Período literário (opcional)" 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)} 
            size="lg"
          />
          <Textarea 
            placeholder="Biografia (opcional)" 
            value={bio} 
            onChange={(e) => setBio((e.target as HTMLTextAreaElement).value)} 
            minRows={4}
            size="lg"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              onClick={() => setOpen(false)} 
              disabled={isCreating}
              size="lg"
            >
              Cancelar
            </Button>
            <Button 
              variant="solid" 
              onClick={async () => {
                if (!name.trim()) return;
                try {
                  const createdRaw: unknown = await create.mutateAsync({ 
                    name: name.trim(), 
                    period: period ? period.trim() : undefined, 
                    bio: bio ? bio.trim() : undefined 
                  });
                  // extract id safely from unknown
                  let newId: number | null = null;
                  if (createdRaw && typeof createdRaw === 'object') {
                    const rec = createdRaw as Record<string, unknown>;
                    const idVal = rec.id;
                    if (typeof idVal === 'number') newId = idVal;
                    else if (typeof idVal === 'string' && idVal !== '') {
                      const parsed = Number(idVal);
                      newId = Number.isFinite(parsed) ? parsed : null;
                    }
                  }
                  onChange(newId);
                  setOpen(false);
                  setName(''); setPeriod(''); setBio('');
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
                  console.error(msg);
                  alert('Falha ao criar autor: ' + msg);
                }
              }} 
              disabled={isCreating || !name.trim()}
              size="lg"
            >
              {create.isPending ? 'Criando...' : 'Criar Autor'}
            </Button>
          </Stack>
        </Stack>
      </StandardModal>
    </Stack>
  );
}
