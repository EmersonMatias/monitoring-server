/*
  Warnings:

  - You are about to drop the column `date` on the `Checkpoint` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Status` table. All the data in the column will be lost.
  - Added the required column `day` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minute` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Checkpoint` DROP COLUMN `date`,
    ADD COLUMN `day` INTEGER NOT NULL,
    ADD COLUMN `month` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Messages` DROP COLUMN `date`,
    ADD COLUMN `day` INTEGER NOT NULL,
    ADD COLUMN `month` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Status` DROP COLUMN `time`,
    ADD COLUMN `hour` INTEGER NOT NULL,
    ADD COLUMN `minute` INTEGER NOT NULL;
