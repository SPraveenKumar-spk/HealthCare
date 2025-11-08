import jwt from "jsonwebtoken";
import  prisma  from "../config/prisma.js";

const JWT_SECRET = "supersecretkey";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
