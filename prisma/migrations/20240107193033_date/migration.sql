/*
  Warnings:

  - You are about to alter the column `date` on the `Checkpoint` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Date`.
  - You are about to alter the column `date` on the `Messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Date`.

*/
-- AlterTable
ALTER TABLE `Checkpoint` MODIFY `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Messages` MODIFY `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
