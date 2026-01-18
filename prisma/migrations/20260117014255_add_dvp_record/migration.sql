/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DvpStatus" AS ENUM ('DRAFT', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "DvpRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "DvpStatus" NOT NULL DEFAULT 'DRAFT',
    "data" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DvpRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DvpRecord_userId_idx" ON "DvpRecord"("userId");

-- AddForeignKey
ALTER TABLE "DvpRecord" ADD CONSTRAINT "DvpRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
