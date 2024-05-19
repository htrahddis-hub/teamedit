/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" VARCHAR(30) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(50);
