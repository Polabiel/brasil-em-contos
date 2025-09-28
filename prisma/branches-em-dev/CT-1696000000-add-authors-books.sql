-- Migration placeholder: add Author and Book models
-- TODO: run `prisma migrate dev` to generate concrete SQL and apply to your database
-- This file documents the intended schema changes for the branch.

-- Create table Author
CREATE TABLE IF NOT EXISTS "Author" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "period" TEXT,
  "bio" TEXT
);

-- Create table Book
CREATE TABLE IF NOT EXISTS "Book" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "year" INTEGER,
  "authorId" INTEGER NOT NULL REFERENCES "Author"("id") ON DELETE CASCADE
);

-- Add authorId to Post table
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "authorId" INTEGER;
ALTER TABLE "Post" ADD CONSTRAINT IF NOT EXISTS "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL;
