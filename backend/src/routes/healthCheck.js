import { Router } from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

/* ---------------------------
   GET available online slots
----------------------------*/
router.get("/slots", authMiddleware, async (req, res) => {
  try {
    const slots = await prisma.doctorOnlineSlot.findMany({
      where: { isBooked: false },
      include: {
        doctor: true,
      },
      orderBy: { date: "asc" },
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Error fetching slots" });
  }
});

/* ---------------------------
   BOOK an online consultation
----------------------------*/
router.post("/bookhealthcheck", authMiddleware, async (req, res) => {
  try {
    const patientId = req.user.patient?.id;
    if (!patientId)
      return res.status(401).json({ error: "Only patients can book" });

    const { slotId, notes } = req.body;

    const slot = await prisma.doctorOnlineSlot.findUnique({
      where: { id: slotId },
    });

    if (!slot || slot.isBooked)
      return res.status(400).json({ error: "Slot unavailable" });

    // Generate meeting link
    const meetingUrl = `https://meet.jit.si/healthcare-${slotId}-${Date.now()}`;

    // Create appointment
    const appoint = await prisma.appointment.create({
      data: {
        patientId,
        doctorId: slot.doctorId,
        appointmentDate: slot.date,
        notes,
        type: "online",
        meetingUrl,
      },
    });

    // Mark slot booked
    await prisma.doctorOnlineSlot.update({
      where: { id: slotId },
      data: { isBooked: true },
    });

    res.json({ message: "Online consultation booked", appoint });
  } catch (err) {
    res.status(500).json({ error: "Error booking consultation" });
  }
});

/* ---------------------------
   CREATE meeting room manually
----------------------------*/
router.post("/meeting", authMiddleware, async (req, res) => {
  try {
    const roomId = `healthcare-app-${Date.now()}`;
    res.json({ roomUrl: `https://meet.jit.si/${roomId}` });
  } catch {
    res.status(500).json({ error: "Error creating meeting" });
  }
});

export default router;
