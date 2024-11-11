/*
  Warnings:

  - You are about to drop the column `departdate` on the `arrivals` table. All the data in the column will be lost.
  - You are about to drop the column `departtime` on the `arrivals` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `arrivals` table. All the data in the column will be lost.
  - You are about to drop the column `gate` on the `arrivals` table. All the data in the column will be lost.
  - Added the required column `arrivedate` to the `arrivals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrivetime` to the `arrivals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baggage` to the `arrivals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `arrivals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "arrivals" DROP COLUMN "departdate",
DROP COLUMN "departtime",
DROP COLUMN "destination",
DROP COLUMN "gate",
ADD COLUMN     "arrivedate" TEXT NOT NULL,
ADD COLUMN     "arrivetime" TEXT NOT NULL,
ADD COLUMN     "baggage" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;
