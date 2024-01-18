-- CreateTable
CREATE TABLE `Contingency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contigency` BOOLEAN NOT NULL DEFAULT false,
    `frequency` INTEGER NOT NULL DEFAULT 60,
    `hour` INTEGER NOT NULL,
    `minute` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'OK',
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Contingency_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contingency` ADD CONSTRAINT `Contingency_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
