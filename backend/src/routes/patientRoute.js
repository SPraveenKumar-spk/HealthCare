import { Router } from "express";
import prisma from "../config/prisma.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// GET profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 

    const patient = await prisma.patient.findUnique({
      where: { userId },
      include: {
        user: {
          select: { email: true, role: true, createdAt: true },
        },
      },
    });

    if (!patient)
      return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // ✅ FIXED
    const { fullName, phone, age, gender, address } = req.body;

    const patient = await prisma.patient.findUnique({ where: { userId } });

    if (!patient)
      return res.status(404).json({ message: "Patient not found" });

    const updated = await prisma.patient.update({
      where: { userId },
      data: {
        fullName,
        phone,
        age: age ? Number(age) : null,
        gender,
        address,
      },
    });

    res.json({ message: "Profile updated successfully", patient: updated });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
