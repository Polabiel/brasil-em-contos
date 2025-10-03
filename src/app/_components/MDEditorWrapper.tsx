"use client";

import dynamic from "next/dynamic";
import React from "react";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

// load editor only on client to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type PreviewMode = "edit" | "preview" | "live";

type MDEditorWrapperProps = {
  value: string;
  onChange: (v?: string) => void;
  height?: number;
  preview?: PreviewMode;
  visibleDragbar?: boolean;
};

export default function MDEditorWrapper({
  value,
  onChange,
  height = 320,
  preview = "edit",
  visibleDragbar = true,
}: MDEditorWrapperProps) {
  const handleChange = React.useCallback(
    (newValue?: string) => {
      if (!newValue) {
        onChange(newValue);
        return;
      }

      const processedValue = newValue.replace(/^( )(?=\S)/gm, "ㅤ");
      onChange(processedValue);
    },
    [onChange],
  );

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={handleChange}
        height={height}
        preview={preview}
        visibleDragbar={visibleDragbar}
        previewOptions={{
          skipHtml: false, // Permite renderizar HTML inline
          remarkPlugins: [remarkGfm, remarkBreaks], // Suporta quebras de linha e GFM
          components: {
            p: ({ children, ...props }) => {
              // Processa ㅤ no preview para mostrar recuo visual
              let processedChildren = children;
              
              if (typeof children === 'string' && children.includes('ㅤ')) {
                // Substitui ㅤ por span com recuo
                const parts = children.split('ㅤ');
                processedChildren = parts.map((part, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span style={{ display: 'inline-block', width: '2em' }} />}
                    {part}
                  </React.Fragment>
                ));
              }

              return (
                <p
                  style={{
                    marginBottom: "1.2rem",
                    lineHeight: 1.7,
                    textAlign: "justify",
                  }}
                  {...props}
                >
                  {processedChildren}
                </p>
              );
            },
            br: () => (
              <br style={{ display: 'block', marginTop: '0.5rem' }} />
            ),
          },
        }}
      />
    </div>
  );
}
