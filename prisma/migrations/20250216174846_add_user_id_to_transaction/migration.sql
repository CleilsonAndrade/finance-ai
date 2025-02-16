/*
  Warnings:

  - Added the required column `userID` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `userID` VARCHAR(191) NOT NULL;
