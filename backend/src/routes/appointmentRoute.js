import { Router } from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ensures user logged in

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

export default router;
