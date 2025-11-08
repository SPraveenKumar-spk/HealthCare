import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../api/axios";

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get doctor profile (using the logged-in user)
        const profileRes = await api.get("/auth/profile", { withCredentials: true });
        console.log("Profile Response:", profileRes.data);
        const doctorId = profileRes.data?.user?.doctor?.id;
        console.log("Doctor ID:", doctorId);

        if (doctorId) {
          // 2️⃣ Get doctor info
          const doctorRes = await api.get(`/doctors/${doctorId}`, { withCredentials: true });
          setDoctor(doctorRes.data);

          // 3️⃣ Get doctor appointments
          const apptRes = await api.get(`/appointments/doctor/${doctorId}`, { withCredentials: true });
          setAppointments(apptRes.data);
        }
      } catch (err) {
        console.error("Error loading doctor data:", err);
      }
    };

    fetchData();
  }, []);

  if (!doctor) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  const todayAppointments = appointments.filter((appt) => {
    const date = new Date(appt.appointmentDate).toDateString();
    return date === new Date().toDateString();
  });

  return (
    <>
    <h2>Hello</h2>
      <Header />
      <div className="pt-24 px-6 md:px-20 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, Dr. {doctor.fullName}
        </h2>
        <p className="text-gray-600 mb-6">Specialization: {doctor.specialization}</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h4 className="text-gray-600 text-sm mb-2">Appointments Today</h4>
            <p className="text-2xl font-bold text-indigo-600">{todayAppointments.length}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h4 className="text-gray-600 text-sm mb-2">Total Patients</h4>
            <p className="text-2xl font-bold text-indigo-600">
              {new Set(appointments.map((a) => a.patientId)).size}
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h4 className="text-gray-600 text-sm mb-2">Upcoming Appointments</h4>
            <p className="text-2xl font-bold text-indigo-600">
              {appointments.filter((a) => new Date(a.appointmentDate) > new Date()).length}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Appointments</h3>
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          {todayAppointments.length > 0 ? (
            <table className="w-full text-left text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Patient</th>
                  <th className="py-2">Time</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((appt) => (
                  <tr key={appt.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{appt.patient.fullName}</td>
                    <td className="py-2">
                      {new Date(appt.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2 capitalize">{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No appointments today.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DoctorDashboard;
