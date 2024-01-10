/*
  Warnings:

  - You are about to drop the column `userId` on the `Alert` table. All the data in the column will be lost.
  - Added the required column `name` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Alert` DROP FOREIGN KEY `Alert_userId_fkey`;

-- AlterTable
ALTER TABLE `Alert` DROP COLUMN `userId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
