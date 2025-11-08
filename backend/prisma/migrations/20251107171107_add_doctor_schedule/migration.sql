/*
  Warnings:

  - You are about to drop the column `day` on the `doctorschedule` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlot` on the `doctorschedule` table. All the data in the column will be lost.
  - Added the required column `dayOfWeek` to the `DoctorSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `DoctorSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `DoctorSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctorschedule` DROP COLUMN `day`,
    DROP COLUMN `timeSlot`,
    ADD COLUMN `dayOfWeek` VARCHAR(191) NOT NULL,
    ADD COLUMN `endTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` VARCHAR(191) NOT NULL;
