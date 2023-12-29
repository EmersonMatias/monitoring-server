-- CreateTable
CREATE TABLE `AlertMessages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(10) NOT NULL,
    `hour` VARCHAR(5) NOT NULL,
    `message` VARCHAR(191) NULL,
    `response` VARCHAR(191) NULL,
    `viewed` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AlertMessages` ADD CONSTRAINT `AlertMessages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
