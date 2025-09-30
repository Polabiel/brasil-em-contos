"use client";

import MDEditor from "@uiw/react-md-editor";
import Box from "@mui/joy/Box";

export default function PostContentClient({ content }: { content: string }) {
  return (
    <Box
      sx={{
        "& .wmde-markdown": {
          fontSize: 16,
          lineHeight: 1.7,
          background: "var(--cv-backgroundPaper)",
          color: "var(--cv-textPrimary)",

          // Headings
          "& h1, & h2, & h3, & h4, & h5, & h6": {
            color: "var(--cv-textPrimary)",
            fontWeight: 700,
            marginTop: "2rem",
            marginBottom: "1rem",
          },

          // Paragraphs
          "& p": {
            color: "var(--cv-textPrimary)",
            marginBottom: "1.2rem",
            lineHeight: 1.7,
          },

          // Links
          "& a": {
            color: "var(--cv-brazilGreen)",
            textDecoration: "none",
            fontWeight: 600,
            "&:hover": {
              textDecoration: "underline",
              color: "#1e5f28",
            },
          },

          // Lists
          "& ul, & ol": {
            color: "var(--cv-textPrimary)",
            marginBottom: "1.2rem",
            paddingLeft: "1.25rem",
            paddingInlineStart: "1.25rem",
            lineHeight: 1.7,
            listStylePosition: "outside",
          },

          "& ul": {
            listStyleType: "disc",
          },

          "& ol": {
            listStyleType: "decimal",
          },

          "& li": {
            color: "var(--cv-textPrimary)",
            marginBottom: "0.6rem",
            position: "relative",
            paddingLeft: "0.25rem",
            lineHeight: 1.6,
            maxWidth: "100%",
            wordBreak: "break-word",
          },

          // Modern marker styling where supported
          "& li::marker": {
            color: "var(--cv-brazilGreen)",
            fontWeight: 700,
            fontSize: "0.95em",
          },

          // Nested lists get extra indent
          "& ul ul, & ol ol, & ul ol, & ol ul": {
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            paddingLeft: "1rem",
          },

          // Fallback for older browsers: small custom bullet before element (will be hidden if ::marker available)
          "@supports not (list-style-type: disc)": {
            "& li::before": {
              content: "'•'",
              display: "inline-block",
              width: "1em",
              marginLeft: "-1em",
              color: "var(--cv-brazilGreen)",
              fontWeight: 700,
              marginRight: "0.35rem",
            },
          },

          // Smaller screens: slightly tighter indents
          "@media (max-width: 600px)": {
            "& ul, & ol": {
              paddingLeft: "1rem",
            },
            "& ul ul, & ol ol, & ul ol, & ol ul": {
              paddingLeft: "0.8rem",
            },
          },

          // Blockquotes
          "& blockquote": {
            borderLeft: "4px solid var(--cv-brazilGreen)",
            paddingLeft: "1rem",
            marginLeft: 0,
            marginBottom: "1.2rem",
            fontStyle: "italic",
            color: "var(--cv-textMuted80)",
            background: "var(--cv-neutral50)",
            padding: "1rem",
            borderRadius: "8px",
          },

          // Code blocks
          "& pre": {
            background: "var(--cv-neutral100)",
            border: "1px solid var(--cv-neutral200)",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.2rem",
            overflow: "auto",
          },

          "& code": {
            background: "var(--cv-neutral100)",
            padding: "0.2rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.9em",
            color: "var(--cv-textPrimary)",
          },

          // Tables - Force override MDEditor styles
          "& table": {
            borderCollapse: "collapse !important",
            width: "100%",
            marginBottom: "1.2rem",
            border: "1px solid #e0e0e0 !important",
            background: "white !important",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          },

          "& th, & td": {
            border: "1px solid #e0e0e0 !important",
            padding: "0.75rem !important",
            textAlign: "left",
            color: "#333333 !important",
            background: "white !important",
          },

          "& th": {
            background: "#f8f9fa !important",
            fontWeight: 600,
            color: "#2d3748 !important",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },

          "& tbody tr:nth-of-type(even) td": {
            background: "#f8f9fa !important",
          },

          "& tbody tr:hover td": {
            background: "#e3f2fd !important",
          },

          // Images - Fixed size and better presentation
          "& img": {
            maxWidth: "600px !important",
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            marginTop: "1rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",

            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            },
          },

          // Horizontal rules
          "& hr": {
            border: "none",
            borderTop: "2px solid var(--cv-neutral200)",
            margin: "2rem 0",
          },
        },
      }}
    >
      <MDEditor.Markdown source={content} />
    </Box>
  );
}
