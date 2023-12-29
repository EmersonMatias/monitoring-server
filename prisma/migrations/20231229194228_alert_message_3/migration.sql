-- AlterTable
ALTER TABLE `AlertMessages` MODIFY `message` VARCHAR(191) NULL DEFAULT 'null',
    MODIFY `response` VARCHAR(191) NULL DEFAULT 'null';
