-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'NORMAL', 'DOCTOR', 'RESPONSABLE');

-- CreateEnum
CREATE TYPE "Blood" AS ENUM ('A_PLUS', 'B_PLUS', 'AB', 'O');

-- CreateEnum
CREATE TYPE "Medical_Ship_Type" AS ENUM ('FIXED', 'OCCASIONAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "chronic_dialies" TEXT[],
    "blood_type" "Blood" NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'RESPONSABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
