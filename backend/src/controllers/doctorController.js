import prisma from "../config/prisma.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        schedules: true,
        user: true,
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
        image: "https://cdn-icons-png.flaticon.com/512/387/387561.png", // temporary
        schedule,
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
