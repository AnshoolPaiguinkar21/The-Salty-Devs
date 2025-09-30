/*
  Warnings:

  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Tag_slug_key";

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "description" TEXT,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "public"."Tag" DROP COLUMN "slug";
