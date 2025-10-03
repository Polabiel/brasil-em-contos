# Migration: Convert Tag to Tags Array

This PR implements support for multiple tags per post instead of a single tag.

## Database Migration

To apply the database schema changes, run:

```bash
# Apply the migration
npm run db:push
```

Or if you want to use the migration system:

```bash
# Apply migrations
npx prisma migrate deploy
```

The migration will:
1. Add MODERNISMO and CONTEMPORANEO values to the BookTag enum
2. Add a new `tags` column as an array of `BookTag` enum values
3. Migrate existing `tag` values to the `tags` array
4. Remove the old `tag` column

## Changes Made

### Schema Changes
- Updated `prisma/schema.prisma` to change `tag: BookTag?` to `tags: BookTag[]`
- Added MODERNISMO and CONTEMPORANEO to the BookTag enum
- Created migration files:
  - `prisma/migrations/20251003_add_modernismo_contemporaneo/` for new enum values
  - `prisma/migrations/20251003_convert_tag_to_tags_array/` for tag to tags conversion

### API Changes
- Updated POST `/api/admin/posts` to accept `tags` array
- Updated PUT `/api/admin/posts/[id]` to accept `tags` array
- Updated TRPC `post` router to handle tags arrays
- Updated `byTag` query to use `has` operator for array search

### UI Changes
- Updated `CreatePostClient.tsx` to use multi-select for tags
- Updated `EditPostClient.tsx` to use multi-select for tags
- Updated `AdminPostsClient.tsx` to display multiple tags
- Updated post display page to show all tags
- Updated `PostsGrid.tsx` to handle tags array

## Testing

After deploying these changes:

1. Create a new post and select multiple tags
2. Edit an existing post and add/remove tags
3. Verify tags are displayed correctly in:
   - Admin post list
   - Post detail page
   - Posts grid

## Notes

- The UI uses Joy UI's multi-select component for tag selection
- Tags are stored as PostgreSQL arrays
- The migration preserves existing tag data by converting single tags to single-element arrays
- The byTag filter now uses the PostgreSQL array `has` operator to check if a tag exists in the array
