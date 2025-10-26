/*
  Warnings:

  - The values [OFLINE] on the enum `StateEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StateEnum_new" AS ENUM ('OFFLINE', 'ONLINE');
ALTER TABLE "public"."OltsInfo" ALTER COLUMN "state" TYPE "public"."StateEnum_new" USING ("state"::text::"public"."StateEnum_new");
ALTER TYPE "public"."StateEnum" RENAME TO "StateEnum_old";
ALTER TYPE "public"."StateEnum_new" RENAME TO "StateEnum";
DROP TYPE "public"."StateEnum_old";
COMMIT;
