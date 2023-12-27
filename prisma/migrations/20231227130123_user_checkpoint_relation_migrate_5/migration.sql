/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Checkpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Checkpoint_date_key` ON `Checkpoint`(`date`);
