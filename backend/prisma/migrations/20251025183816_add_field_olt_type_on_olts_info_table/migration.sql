/*
  Warnings:

  - Added the required column `oltType` to the `OltsInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OltTypeEnum" AS ENUM ('HUAWE', 'ZTE');

-- AlterTable
ALTER TABLE "public"."OltsInfo" ADD COLUMN     "oltType" "public"."OltTypeEnum" NOT NULL;
