import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [appointments, setAppointments] = useState([]);
  const [checkups, setCheckups] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const apptRes = await api.get("/appointments/patient", { withCredentials: true });
        const checkRes = await api.get("/health-check/mine", { withCredentials: true });

        setAppointments(apptRes.data || []);
        setCheckups(checkRes.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    }
    loadData();
  }, []);

  const upcoming = appointments.filter((a) => new Date(a.appointmentDate) > new Date());
  const upcomingCheckups = checkups.filter((c) => new Date(c.date) > new Date());

  const isDashboardHome = location.pathname === "/patient";

  return (
    <>
      <Header />

      <div className="pt-20 min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 space-y-4 border-r border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Hi, {user?.fullName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>

          <nav className="flex flex-col gap-2 text-gray-700">

            <NavLink
              to="/patient"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/patient/appointments"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`
              }
            >
              My Appointments
            </NavLink>

            <NavLink
              to="/patient/book"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`
              }
            >
              Book Appointment
            </NavLink>

            <NavLink
              to="/patient/health-checkup"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
                }`
              }
            >
              Book Health Check-up
            </NavLink>

            <NavLink
              to="/patient/find-hospital"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`
              }
            >
              Find Hospital
            </NavLink>

            <NavLink
              to="/patient/consult-online"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`
              }
            >
              Consult Online
            </NavLink>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">

          {/* ---------- DASHBOARD HOME SUMMARY ---------- */}
          {isDashboardHome && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-10">

                {/* Appointment Cards */}
                <div className="bg-white shadow p-6 rounded-xl border border-gray-200">
                  <h4 className="text-sm text-gray-500">Upcoming Appointments</h4>
                  <p className="text-3xl font-bold text-indigo-600">{upcoming.length}</p>
                </div>

                <div className="bg-white shadow p-6 rounded-xl border border-gray-200">
                  <h4 className="text-sm text-gray-500">Total Appointments</h4>
                  <p className="text-3xl font-bold text-indigo-600">
                    {appointments.length}
                  </p>
                </div>

                {/* Quick Book Appointment */}
                <div className="bg-white shadow p-6 rounded-xl border border-gray-200 flex flex-col justify-between">
                  <p className="text-sm text-gray-500">Need to book?</p>
                  <button
                    onClick={() => navigate("/patient/book")}
                    className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Book Appointment
                  </button>
                </div>

                {/* Health Check Summary */}
                <div className="bg-white shadow p-6 rounded-xl border border-gray-200">
                  <h4 className="text-sm text-gray-500">Upcoming Health Check-ups</h4>
                  <p className="text-3xl font-bold text-green-600">{upcomingCheckups.length}</p>
                </div>

                <div className="bg-white shadow p-6 rounded-xl border border-gray-200">
                  <h4 className="text-sm text-gray-500">Total Health Check-ups</h4>
                  <p className="text-3xl font-bold text-green-600">{checkups.length}</p>
                </div>

                <div className="bg-white shadow p-6 rounded-xl border border-gray-200 flex flex-col justify-between">
                  <p className="text-sm text-gray-500">Book a health check-up?</p>
                  <button
                    onClick={() => navigate("/patient/health-checkup")}
                    className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Book Health Check-up
                  </button>
                </div>

              </div>

              {/* ---------- Recent Health Check-ups ---------- */}
              <div className="bg-white shadow p-6 rounded-xl border border-gray-200 mb-10">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Recent Health Check-ups
                </h3>

                {checkups.length === 0 ? (
                  <p className="text-gray-500">No health check-ups booked yet.</p>
                ) : (
                  <div className="space-y-3">
                    {checkups.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-4 border rounded-lg">
                        <p className="font-medium">{c.packageName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(c.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">{c.notes || "No notes"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}


          {!isDashboardHome && (
            <div className="bg-white shadow p-8 rounded-xl border border-gray-200">
              <Outlet />
            </div>
          )}

        </main>
      </div>

      <Footer />
    </>
  );
}
