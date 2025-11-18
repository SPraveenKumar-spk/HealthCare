import  prisma  from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRETKEY;

export const register = async (req, res) => {
  try {
    const { email, password, role, fullName } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed, role },
    });

    if (role === "patient") {
      await prisma.patient.create({
        data: { userId: user.id, fullName },
      });
    } else if (role === "doctor") {
      await prisma.doctor.create({
        data: { userId: user.id, fullName, specialization: "General" },
      });
    }

    return res.json({ message: "Registered successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({ role: user.role });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};
