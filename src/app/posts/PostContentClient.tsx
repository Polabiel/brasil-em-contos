"use client";

import MDEditor from '@uiw/react-md-editor';
import Box from '@mui/joy/Box';

export default function PostContentClient({ content }: { content: string }) {
  return (
    <Box sx={{ '& .wmde-markdown': { fontSize: 16, lineHeight: 1.7, background: 'white', color: 'black'} }}>
      <MDEditor.Markdown source={content} />
    </Box>
  );
}
