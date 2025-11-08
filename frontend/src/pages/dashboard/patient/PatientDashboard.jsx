import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useAuth(); // { fullName, role }

  return (
    <div className="flex min-h-screen pt-16 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Hi, {user?.fullName}
        </h2>
        <p className="text-sm text-gray-500">{user?.role}</p>

        <nav className="flex flex-col gap-4 mt-6">
          <NavLink to="/dashboard/patient" end className="hover:text-blue-600">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/patient/appointments" className="hover:text-blue-600">
            My Appointments
          </NavLink>
          <NavLink to="/dashboard/patient/book" className="hover:text-blue-600">
            Book Appointment
          </NavLink>
          <NavLink to="/dashboard/patient/profile" className="hover:text-blue-600">
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientDashboard;
