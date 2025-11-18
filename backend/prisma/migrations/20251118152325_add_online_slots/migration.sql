-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `meetingUrl` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'offline';

-- CreateTable
CREATE TABLE `DoctorOnlineSlot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorOnlineSlot` ADD CONSTRAINT `DoctorOnlineSlot_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
