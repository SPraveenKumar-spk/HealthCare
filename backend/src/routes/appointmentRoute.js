import { Router } from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middlewares/authMiddleware.js"; 

const router = Router();

// Book an appointment
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { doctorId, appointmentDate, time } = req.body;

    if (!doctorId || !appointmentDate || !time)
      return res.status(400).json({ message: "All fields required" });

    // Ensure the logged-in user is a Patient
    const patient = await prisma.patient.findUnique({
      where: { userId: req.user.userId },
    });

    if (!patient)
      return res.status(403).json({ message: "Only patients can book appointments" });

    // Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: Number(doctorId),
        appointmentDate: new Date(`${appointmentDate}T${time}`),
        status: "scheduled",
      },
    });

    return res.json({
      message: "Appointment booked successfully ✅",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get all appointments for the logged-in patient
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const patient = await prisma.patient.findUnique({
      where: { userId },
    });
    if (!patient)
      return res.status(403).json({ message: "Only patients can view their appointments" });

    const appointments = await prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        doctor: {
          include: { user: true },
        },
      },
      orderBy: { appointmentDate: "desc" },
    });

    const formatted = appointments.map((appt) => ({
      id: appt.id,
      doctorName: appt.doctor.fullName,
      specialization: appt.doctor.specialization,
      email: appt.doctor.user.email,
      appointmentDate: appt.appointmentDate,
      status: appt.status,
      notes: appt.notes,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await prisma.appointment.findMany({
      where: { doctorId: Number(doctorId) },
      include: {
        patient: true,
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
