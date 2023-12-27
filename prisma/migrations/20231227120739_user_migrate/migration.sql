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

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
