-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `dateofbirth` VARCHAR(10) NOT NULL,
    `login` VARCHAR(150) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `rg` VARCHAR(9) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `agency` VARCHAR(150) NOT NULL,
    `entryTime` VARCHAR(5) NOT NULL,
    `departureTime` VARCHAR(5) NOT NULL,
    `accountType` ENUM('user', 'admin') NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Checkpoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(10) NOT NULL,
    `arrived` BOOLEAN NULL DEFAULT false,
    `arrivalTime` VARCHAR(5) NULL DEFAULT 'null',
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Checkpoint` ADD CONSTRAINT `Checkpoint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
