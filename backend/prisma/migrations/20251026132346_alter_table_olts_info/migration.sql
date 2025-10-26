/*
  Warnings:

  - The values [HUAWE] on the enum `OltTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."OltTypeEnum_new" AS ENUM ('HUAWEI', 'ZTE', 'ZTE_STATE');
ALTER TABLE "public"."OltsInfo" ALTER COLUMN "oltType" TYPE "public"."OltTypeEnum_new" USING ("oltType"::text::"public"."OltTypeEnum_new");
ALTER TYPE "public"."OltTypeEnum" RENAME TO "OltTypeEnum_old";
ALTER TYPE "public"."OltTypeEnum_new" RENAME TO "OltTypeEnum";
DROP TYPE "public"."OltTypeEnum_old";
COMMIT;

-- DropIndex
DROP INDEX "public"."OltsInfo_sn_key";
