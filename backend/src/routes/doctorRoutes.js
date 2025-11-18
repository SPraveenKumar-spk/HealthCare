import { Router } from "express";
import prisma from "../config/prisma.js";

const router = Router();

// 🧩 Get all doctors (summary)
router.get("/", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: true,
        schedules: true,
      },
    });

    const formatted = doctors.map((doc) => {
      const schedule = {};

      doc.schedules.forEach((slot) => {
        if (!schedule[slot.dayOfWeek]) schedule[slot.dayOfWeek] = [];
        schedule[slot.dayOfWeek].push(`${slot.startTime} - ${slot.endTime}`);
      });

      return {
        id: doc.id,
        fullName: doc.fullName,
        specialization: doc.specialization,
        phone: doc.phone,
        email: doc.user?.email,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
        schedule,
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🩺 Get a single doctor (detailed, includes schedule)
router.get("/:id", async (req, res) => {
  try {
    const doctorId = parseInt(req.params.id);

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { user: true, schedules: true },
    });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // 🗓️ Format schedule into grouped object
    const schedule = {};
    doctor.schedules.forEach((slot) => {
      if (!schedule[slot.dayOfWeek]) schedule[slot.dayOfWeek] = [];
      schedule[slot.dayOfWeek].push(`${slot.startTime} - ${slot.endTime}`);
    });

    res.json({ ...doctor, schedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ Update doctor info
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, specialization, phone } = req.body;

    const updated = await prisma.doctor.update({
      where: { id: parseInt(id) },
      data: { fullName, specialization, phone },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ Add schedule slot
router.post("/:id/schedule", async (req, res) => {
  try {
    const doctorId = parseInt(req.params.id);
    const { dayOfWeek, startTime, endTime } = req.body;

    const slot = await prisma.doctorSchedule.create({
      data: { doctorId, dayOfWeek, startTime, endTime },
    });

    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/schedule/:scheduleId", async (req, res) => {
  try {
    const { scheduleId } = req.params;
    await prisma.doctorSchedule.delete({ where: { id: parseInt(scheduleId) } });
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
