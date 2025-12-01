/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `display_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `role` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `external_accounts` (
    `id` VARCHAR(191) NOT NULL,
    `provider` ENUM('GOOGLE', 'GITHUB') NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expiry` INTEGER NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `external_accounts_provider_account_id_key`(`provider_account_id`),
    UNIQUE INDEX `external_accounts_user_id_provider_key`(`user_id`, `provider`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_verification` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiry` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'VERIFIED') NOT NULL DEFAULT 'PENDING',
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `email_verification_token_key`(`token`),
    UNIQUE INDEX `email_verification_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiry` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `password_resets_token_key`(`token`),
    UNIQUE INDEX `password_resets_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `multi_factor_authentication` (
    `id` VARCHAR(191) NOT NULL,
    `totp_id` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `multi_factor_authentication_totp_id_key`(`totp_id`),
    UNIQUE INDEX `multi_factor_authentication_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `totps` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('DISABLED', 'PENDING', 'ENABLED') NOT NULL DEFAULT 'DISABLED',
    `secret` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passkeys` (
    `id` VARCHAR(191) NOT NULL,
    `device_name` VARCHAR(191) NOT NULL,
    `credential_id` VARCHAR(191) NOT NULL,
    `public_key` VARCHAR(191) NOT NULL,
    `counter` INTEGER NOT NULL DEFAULT 0,
    `last_used_at` DATETIME(3) NULL,
    `ip` VARCHAR(191) NOT NULL,
    `user_agent` VARCHAR(191) NOT NULL,
    `mfa_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `passkeys_credential_id_key`(`credential_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restrictions` (
    `id` VARCHAR(191) NOT NULL,
    `reason` ENUM('INAPPROPRIATE_USERNAME', 'SPAM', 'OFFENSIVE_BEHAVIOR') NOT NULL,
    `until` DATETIME(3) NULL,
    `status` ENUM('ACTIVE', 'EXPIRED', 'CANCELED') NOT NULL DEFAULT 'ACTIVE',
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `content` VARCHAR(191) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `posts_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `edited` BOOLEAN NOT NULL DEFAULT false,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `author_id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `external_accounts` ADD CONSTRAINT `external_accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `email_verification` ADD CONSTRAINT `email_verification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_resets` ADD CONSTRAINT `password_resets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multi_factor_authentication` ADD CONSTRAINT `multi_factor_authentication_totp_id_fkey` FOREIGN KEY (`totp_id`) REFERENCES `totps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `multi_factor_authentication` ADD CONSTRAINT `multi_factor_authentication_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `passkeys` ADD CONSTRAINT `passkeys_mfa_id_fkey` FOREIGN KEY (`mfa_id`) REFERENCES `multi_factor_authentication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restrictions` ADD CONSTRAINT `restrictions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
