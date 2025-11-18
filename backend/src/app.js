import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import patientRoute from "./routes/patientRoute.js";
import healthCheckRoutes from "./routes/healthCheck.js";
import onlineConsultRoute from "./routes/onlineConsult.js";




const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoute);
app.use("/api/patient", patientRoute);
app.use("/api/health-check", healthCheckRoutes);
app.use("/api/online-consult", onlineConsultRoute);

export default app;
