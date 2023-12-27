-- AlterTable
ALTER TABLE `Checkpoint` MODIFY `arrived` BOOLEAN NULL DEFAULT false,
    MODIFY `arrivalTime` VARCHAR(5) NULL DEFAULT 'null';
