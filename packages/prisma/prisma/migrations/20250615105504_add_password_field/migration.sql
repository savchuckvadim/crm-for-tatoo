/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `method` ENUM('EMAIL', 'GOOGLE', 'GITHUB') NOT NULL DEFAULT 'EMAIL',
    ADD COLUMN `password` VARCHAR(191) NULL,
    MODIFY `role` ENUM('USER', 'PORTAL_USER', 'ADMIN') NOT NULL DEFAULT 'USER';
