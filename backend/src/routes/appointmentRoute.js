import { Router } from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = Router();


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctorId, appointmentDate, notes } = req.body;
    const patientId = req.user?.patient?.id;
    if (!patientId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    if (!doctorId || !appointmentDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const parsedDoctorId = parseInt(doctorId);

    const existing = await prisma.appointment.findFirst({
      where: {
        doctorId: parsedDoctorId,
        appointmentDate: new Date(appointmentDate),
        status: { not: "cancelled" },
      },
    });

    if (existing) {
      return res.status(409).json({
        error: "This time slot is already booked with the doctor.",
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId: parsedDoctorId,
        patientId,
        appointmentDate: new Date(appointmentDate),
        notes: notes || "",
        status: "scheduled",
      },
      include: {
        doctor: {
          select: {
            id: true,
            fullName: true,
            specialization: true,
          },
        },
        patient: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});


router.get("/patient", authMiddleware, async (req, res) => {
  try {
    const patientId = req.user?.patient?.id;
    if (!patientId) return res.status(401).json({ error: "Unauthorized" });

    const appointments = await prisma.appointment.findMany({
      where: { patientId },
      include: {
        doctor: {
          select: {
            id: true,
            fullName: true,
            specialization: true,
            // email: true,
            phone: true,
          },
        },
      },
      orderBy: { appointmentDate: "desc" },
    });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/doctor/:id", async (req, res) => {
  try {
    const doctorId = parseInt(req.params.id);

    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      include: {
        patient: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
      orderBy: { appointmentDate: "asc" },
    });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
