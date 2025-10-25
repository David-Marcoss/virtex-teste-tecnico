-- CreateEnum
CREATE TYPE "public"."StateEnum" AS ENUM ('OFLINE', 'ONLINE');

-- CreateTable
CREATE TABLE "public"."OltsInfo" (
    "id" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "ont_id" TEXT NOT NULL,
    "sn" TEXT,
    "state" "public"."StateEnum",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OltsInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OltsInfo_sn_key" ON "public"."OltsInfo"("sn");
