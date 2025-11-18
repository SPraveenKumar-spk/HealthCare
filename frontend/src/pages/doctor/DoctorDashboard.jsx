import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../api/axios";
import { Outlet } from "react-router-dom";

function DoctorDashboard() {
  const [onlineAppointments, setOnlineAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Get doctor profile (using logged-in user)
        const profileRes = await api.get("/auth/profile", { withCredentials: true });
        const doctorId = profileRes.data?.user?.doctor?.id;

        if (doctorId) {
          // 2️⃣ Get doctor info (includes schedule)
          const doctorRes = await api.get(`/doctors/${doctorId}`, { withCredentials: true });
const data = doctorRes.data;
// inside useEffect after you have doctorId
const onlineRes = await api.get(`/online-consult/doctor/${doctorId}`, { withCredentials: true });
setOnlineAppointments(onlineRes.data || []);

// 🧩 Convert schedules array into grouped object
if (Array.isArray(data.schedules)) {
  const grouped = {};
  data.schedules.forEach((slot) => {
    if (!grouped[slot.dayOfWeek]) grouped[slot.dayOfWeek] = [];
    grouped[slot.dayOfWeek].push(`${slot.startTime} - ${slot.endTime}`);
  });
  data.schedule = grouped;
}

setDoctor(data);
          // 3️⃣ Get appointments
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

  const upcomingAppointments = appointments.filter(
    (a) => new Date(a.appointmentDate) > new Date()
  );

  return (
    <>
      <Header />
      <div className="pt-24 px-6 md:px-20 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, Dr. {doctor.fullName}
        </h2>
        <p className="text-gray-600 mb-8">
          Specialization: {doctor.specialization}
        </p>

        {/* 🔹 Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h4 className="text-gray-600 text-sm mb-2">Appointments Today</h4>
            <p className="text-2xl font-bold text-indigo-600">{todayAppointments.length}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h4 className="text-gray-600 text-sm mb-2">Upcoming Appointments</h4>
            <p className="text-2xl font-bold text-indigo-600">{upcomingAppointments.length}</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
            <h4 className="text-gray-600 text-sm mb-2">Total Patients</h4>
            <p className="text-2xl font-bold text-indigo-600">
              {new Set(appointments.map((a) => a.patientId)).size}
            </p>
          </div>
          

          <div
            onClick={() => navigate("/doctor/profile#personal-info")}
            className="bg-indigo-600 text-white p-6 rounded-xl shadow-md cursor-pointer hover:bg-indigo-700 transition"
          >
            <h4 className="text-sm mb-2">Edit Profile / Schedule</h4>
            <p className="text-lg font-semibold">Go to Profile →</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200 mt-6">
  <h3 className="text-xl font-semibold text-indigo-600 mb-4">Upcoming Online Consultations</h3>
  {onlineAppointments.length === 0 ? (
    <p className="text-gray-500">No online consultations scheduled.</p>
  ) : (
    onlineAppointments.map(appt => (
      <div key={appt.id} className="flex justify-between items-center border-b py-3">
        <div>
          <div className="font-medium">{appt.patient?.fullName}</div>
          <div className="text-sm text-gray-600">{new Date(appt.appointmentDate).toLocaleString()}</div>
        </div>
        <div className="text-right">
          <a className="text-blue-600 underline" href={appt.meetingUrl} target="_blank" rel="noreferrer">Join</a>
        </div>
      </div>
    ))
  )}
</div>


        {/* 👤 Doctor Info Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            Profile Overview
          </h3>
          <div className="flex items-center gap-6">
            <img
              src={doctor.imageUrl || "https://cdn-icons-png.flaticon.com/512/387/387561.png"}
              alt={doctor.fullName}
              className="w-24 h-24 rounded-full object-cover shadow-sm"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {doctor.fullName}
              </p>
              <p className="text-gray-600">{doctor.specialization}</p>
              <p className="text-gray-500 text-sm">
                Email: {doctor.email || "Not available"}
              </p>
              <p className="text-gray-500 text-sm">
                Phone: {doctor.phone || "Not added"}
              </p>
            </div>
          </div>
        </div>

        {/* 🗓️ Schedule Overview */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-10">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            Weekly Schedule
          </h3>
          {doctor.schedule ? (
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(doctor.schedule).map(([day, times]) => (
                <div
                  key={day}
                  className="border rounded-lg p-4 hover:shadow-sm transition"
                >
                  <h4 className="font-medium text-gray-800 mb-2">{day}</h4>
                  {times.length > 0 ? (
                    times.map((t, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {t}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">Not available</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No schedule added yet.</p>
          )}
        </div>

        {/* 📅 Today's Appointments */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Today's Appointments
        </h3>
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
      <Outlet />
      <Footer />
    </>
  );
}

export default DoctorDashboard;
