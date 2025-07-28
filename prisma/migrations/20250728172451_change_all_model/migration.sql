/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - Made the column `remark` on table `arrivals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gate` on table `departures` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `departures` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_idx";

-- AlterTable
ALTER TABLE "arrivals" ALTER COLUMN "remark" SET NOT NULL;

-- AlterTable
ALTER TABLE "departures" ALTER COLUMN "gate" SET NOT NULL,
ALTER COLUMN "remark" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "email_verified_at",
DROP COLUMN "remember_token",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
