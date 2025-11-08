import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
// import BookAppointment from "./components/Services/BookAppointment";
import HealthCheckup from "./components/Services/HealthCheckup";
import FindDoctor from "./components/Services/FindDoctor";
import FindHospital from "./components/Services/FindHospital";
import ConsultOnline from "./components/Services/ConsultOnline";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PasswordReset from "./pages/auth/PasswordReset";
import PatientDashboard from "./pages/dashboard/patient/PatientDashboard";
import Appointments from "./pages/dashboard/patient/Appointments";
import BookAppointment from "./pages/dashboard/patient/BookAppointment";
import Profile from "./pages/dashboard/patient/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

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
          path="/dashboard/patient"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Appointments />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
          {/* <Route path="/book-appointment" element={<BookAppointment />} /> */}
          {/* <Route path="/health-checkup" element={<HealthCheckup />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/find-hospital" element={<FindHospital />} />
          <Route path="/consult-online" element={<ConsultOnline />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
