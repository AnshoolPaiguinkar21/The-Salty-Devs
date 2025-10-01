/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."_PostToTag";

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
