/*
  Warnings:

  - You are about to drop the `uploadedfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `uploadedfile`;

-- CreateTable
CREATE TABLE `uploadedFile` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
