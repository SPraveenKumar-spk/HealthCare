import prisma from "../config/prisma.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        schedules: true,
        user: {
          select: { email: true }, // avoid sending password, createdAt, etc.
        },
      },
    });

    const formattedDoctors = doctors.map((doc) => {
      const schedule = {};

      // Ensure schedules exist before looping
      if (doc.schedules && doc.schedules.length > 0) {
        doc.schedules.forEach((slot) => {
          if (!schedule[slot.dayOfWeek]) schedule[slot.dayOfWeek] = [];
          schedule[slot.dayOfWeek].push(`${slot.startTime} - ${slot.endTime}`);
        });
      }

      // Return a safe, frontend-ready object
      return {
        id: doc.id,
        fullName: doc.fullName,
        specialization: doc.specialization,
        email: doc.user.email,
        phone: doc.phone || "N/A",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
        schedule,
      };
    });

    res.status(200).json(formattedDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: error.message });
  }
};
