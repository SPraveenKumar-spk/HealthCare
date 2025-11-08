import { Router } from "express";
import prisma from "../config/prisma.js";

const router = Router();

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
        doctor: doc.fullName,
        specialization: doc.specialization,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
        zoom: {
          meetingId: "123-456-789", // placeholder (we'll make real later)
          password: "abc123",
        },
        schedule,
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
