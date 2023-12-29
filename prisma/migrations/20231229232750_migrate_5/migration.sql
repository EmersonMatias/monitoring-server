/*
  Warnings:

  - You are about to drop the `AlertMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AlertMessages` DROP FOREIGN KEY `AlertMessages_userId_fkey`;

-- DropTable
DROP TABLE `AlertMessages`;

-- CreateTable
CREATE TABLE `Alertmessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(10) NOT NULL,
    `hour` VARCHAR(5) NOT NULL,
    `message` VARCHAR(191) NULL DEFAULT 'null',
    `response` VARCHAR(191) NULL DEFAULT 'null',
    `viewed` BOOLEAN NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alertmessages` ADD CONSTRAINT `Alertmessages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
