import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PasswordReset from "./pages/auth/PasswordReset";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/patient/MyAppointments";
import BookAppointment from "./pages/patient/BookAppointment";
import PatientProfile from "./pages/patient/Profile";
import FindHospital from "./pages/patient/FindHospital";
import BookHealthCheck from "./pages/patient/BookHealthCheck";
import ConsultOnline from "./pages/patient/ConsultOnline";
import DoctorProfile from "./pages/doctor/DoctorProfile";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<PasswordReset />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="appointments" element={<Appointments />} />
            <Route path="book" element={<BookAppointment />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="find-hospital" element={<FindHospital />} />
            <Route path="health-checkup" element={<BookHealthCheck />} />
            <Route path="consult-online" element={<ConsultOnline />} />
          </Route>

          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />

              </ProtectedRoute>
            }
            >
            <Route path="profile" element={<DoctorProfile />} />
            </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
