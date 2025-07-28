/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `arrivals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departures` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "email_verified_at" TIMESTAMP(3),
ADD COLUMN     "remember_token" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "arrivals";

-- DropTable
DROP TABLE "departures";

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");
