"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// load editor only on client to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type PreviewMode = 'edit' | 'preview' | 'live';

type MDEditorWrapperProps = {
 value: string;
 onChange: (v?: string) => void;
 height?: number;
 preview?: PreviewMode;
 visibleDragbar?: boolean;
};

export default function MDEditorWrapper({ value, onChange, height = 320, preview = 'edit', visibleDragbar = true }: MDEditorWrapperProps) {
 return (
  <div data-color-mode="light">
   {/* delegate into @uiw/react-md-editor */}
   <MDEditor value={value} onChange={onChange} height={height} preview={preview} visibleDragbar={visibleDragbar} />
  </div>
 );
}
