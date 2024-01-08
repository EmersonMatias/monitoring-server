/*
  Warnings:

  - You are about to drop the column `date` on the `Status` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Status` table. All the data in the column will be lost.
  - Added the required column `status` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Status` DROP COLUMN `date`,
    DROP COLUMN `name`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Status` ADD CONSTRAINT `Status_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
