import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRETKEY;

export default async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized. No token found." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
}
