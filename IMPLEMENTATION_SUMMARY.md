# Multiple Tags Support - Implementation Summary

## Overview
This PR implements support for multiple tags per post, allowing posts to be categorized with multiple genres/categories instead of just one.

## Key Changes

### 1. Database Schema (prisma/schema.prisma)
```diff
model Post {
  id          Int       @id @default(autoincrement())
  name        String
  content     String?
  description String?
  image       String?
  imageBlob   Bytes?
  imageMime   String?
- tag         BookTag?
+ tags        BookTag[]
  featured    Boolean   @default(false)
  ...
}
```

### 2. UI Components - Multi-Select

#### Before (Single Select):
```tsx
<Select
  placeholder="Tag do livro (opcional)"
  value={tag}
  onChange={(_, newValue) => setTag(newValue)}
>
  {tags.map((v) => <Option key={v} value={v}>{v}</Option>)}
</Select>
```

#### After (Multi-Select):
```tsx
<Select
  placeholder="Tags do livro (opcional)"
  multiple
  value={tags}
  onChange={(_, newValue) => setTags(newValue as string[])}
>
  {tags.map((v) => <Option key={v} value={v}>{v}</Option>)}
</Select>
```

### 3. API Routes

#### POST /api/admin/posts
- Changed: `tag: z.string().optional()` → `tags: z.array(z.string()).optional()`
- Validates and filters tags to only include valid BookTag enum values
- Sends tags as JSON array in FormData

#### PUT /api/admin/posts/[id]
- Changed: `tag: z.string().optional()` → `tags: z.array(z.string()).optional()`
- Handles empty arrays to clear tags
- Updates tags field with validated array

### 4. TRPC Router (src/server/api/routers/post.ts)

#### Create Mutation:
```diff
- tag: z.string().nullable().optional()
+ tags: z.array(z.string()).optional()

- ...(input.tag ? { tag: input.tag as BookTag } : {})
+ ...(input.tags && input.tags.length > 0 ? { tags: input.tags as BookTag[] } : {})
```

#### Update Mutation:
```diff
- tag: z.string().nullable().optional()
+ tags: z.array(z.string()).optional()

- if (input.tag !== undefined) {
-   data.tag = input.tag ? (input.tag as BookTag) : null;
- }
+ if (input.tags !== undefined) {
+   data.tags = input.tags.length > 0 ? (input.tags as BookTag[]) : [];
+ }
```

#### byTag Query (PostgreSQL Array Search):
```diff
- where: { tag: input.tag as unknown as BookTag }
+ where: { tags: { has: input.tag as unknown as BookTag } }
```

### 5. Display Components

#### Post Detail Page (src/app/posts/[id]/page.tsx):
Shows all tags with chip-style badges:
```tsx
{post.tags && post.tags.length > 0 && (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
    {post.tags.map((tag) => (
      <Typography key={tag} level="body-sm" sx={{ /* chip styling */ }}>
        {formatTag(tag)}
      </Typography>
    ))}
  </Box>
)}
```

#### Admin Posts List (src/app/admin/posts/AdminPostsClient.tsx):
Shows all tags in a flex container with chips

#### Posts Grid (src/app/_components/layout/PostsGrid.tsx):
Shows the first tag as the primary category

## Migration Strategy

The migration is designed to be **zero-downtime** and **backward compatible**:

1. Adds new `tags` column as array
2. Migrates existing `tag` values to single-element arrays
3. Drops old `tag` column

```sql
-- Add new tags column
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "tags" "BookTag"[] DEFAULT '{}';

-- Migrate existing data
UPDATE "Post" SET "tags" = ARRAY["tag"]::("BookTag"[]) WHERE "tag" IS NOT NULL;

-- Drop old column
ALTER TABLE "Post" DROP COLUMN IF EXISTS "tag";
```

## Benefits

1. **Better Categorization**: Posts can now belong to multiple genres/categories
2. **Improved Discovery**: Users can find posts through multiple tags
3. **Flexibility**: Content creators have more flexibility in categorization
4. **Better Search**: Posts can be found by any of their tags

## Files Modified

- `prisma/schema.prisma` - Schema update
- `src/app/api/admin/posts/route.ts` - POST endpoint
- `src/app/api/admin/posts/[id]/route.ts` - PUT endpoint
- `src/server/api/routers/post.ts` - TRPC router
- `src/app/admin/posts/create/CreatePostClient.tsx` - Create UI
- `src/app/admin/posts/[id]/edit/EditPostClient.tsx` - Edit UI
- `src/app/admin/posts/[id]/edit/page.tsx` - Edit page
- `src/app/posts/[id]/page.tsx` - Display page
- `src/app/admin/posts/AdminPostsClient.tsx` - Admin list
- `src/app/_components/layout/PostsGrid.tsx` - Posts grid

## Migration Instructions

See `MIGRATION_NOTES.md` for detailed deployment instructions.
