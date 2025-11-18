// src/routes/onlineConsult.js
import { Router } from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * GET /api/online-consult/slots
 * Public (but we'll require auth to know patient ID). Returns available (not booked) online slots with doctor info.
 */
router.get("/slots", authMiddleware, async (req, res) => {
  try {
    const slots = await prisma.doctorOnlineSlot.findMany({
      where: { isBooked: false },
      include: {
        doctor: {
          select: { id: true, fullName: true, specialization: true, phone: true },
        },
      },
      orderBy: { date: "asc" },
    });
    res.json(slots);
  } catch (err) {
    console.error("Error fetching online slots:", err);
    res.status(500).json({ message: "Error fetching slots" });
  }
});

/**
 * POST /api/online-consult/doctor/:doctorId/slot
 * Doctor endpoint — create an online slot. Doctor must be logged in; authMiddleware ensures req.user exists.
 * Body: { date: ISOString, endTime: ISOString }
 */
router.post("/doctor/:doctorId/slot", authMiddleware, async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, endTime } = req.body;

    // Optional: validate that req.user is the same doctor or is admin
    if (!req.user?.doctor && req.user?.doctor?.id !== Number(doctorId)) {
      // allow admin or the doctor owner
      // if you want stricter check: compare req.user.doctor.id
    }

    const slot = await prisma.doctorOnlineSlot.create({
      data: {
        doctorId: Number(doctorId),
        date: new Date(date),
        endTime: new Date(endTime),
      },
    });

    res.json(slot);
  } catch (err) {
    console.error("Error creating online slot:", err);
    res.status(500).json({ message: "Error creating slot" });
  }
});

/**
 * POST /api/online-consult/book
 * Patient books an online slot => create Appointment (type: "online") and mark slot isBooked
 * Body: { slotId, notes }
 */
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { slotId, notes } = req.body;
    const patientId = req.user?.patient?.id;

    if (!patientId) return res.status(401).json({ message: "Patient not authorized" });

    const slot = await prisma.doctorOnlineSlot.findUnique({ where: { id: Number(slotId) } });
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    if (slot.isBooked) return res.status(400).json({ message: "Slot is already booked" });

    // Create a meeting URL (Jitsi public instance in this example)
    const meetingUrl = `https://meet.jit.si/healthcare-${Date.now()}`;

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId: slot.doctorId,
        appointmentDate: slot.date,
        type: "online",
        meetingUrl,
        notes: notes || "",
      },
      include: {
        doctor: { select: { id: true, fullName: true, specialization: true } },
        patient: { select: { id: true, fullName: true } },
      },
    });

    // Mark slot as booked
    await prisma.doctorOnlineSlot.update({
      where: { id: Number(slotId) },
      data: { isBooked: true },
    });

    res.status(201).json({ message: "Online consultation booked", appointment });
  } catch (err) {
    console.error("Error booking online consult:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});

/**
 * GET /api/online-consult/doctor/:doctorId
 * Doctor fetches online appointments for themselves (or admin)
 */
router.get("/doctor/:doctorId", authMiddleware, async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Optionally check that the logged-in user is the doctor
    // if (req.user.role === 'doctor' && req.user.doctor?.id !== Number(doctorId)) return res.status(403).json({ message: 'Forbidden' });

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: Number(doctorId),
        type: "online",
      },
      include: {
        patient: { select: { id: true, fullName: true, phone: true } },
      },
      orderBy: { appointmentDate: "asc" },
    });

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching doctor's online appointments:", err);
    res.status(500).json({ message: "Error fetching data" });
  }
});

export default router;
