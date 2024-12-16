/*
  Warnings:

  - You are about to alter the column `status` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('TO_START', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'TO_START';
