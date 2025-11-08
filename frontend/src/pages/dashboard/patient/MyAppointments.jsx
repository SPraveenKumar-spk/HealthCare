import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Footer from "../../../components/Footer";
import api from "../../../api/axios";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointment/mine", { withCredentials: true });
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading appointments...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="md:ps-20 mx-auto bg-gray-100 px-4 pt-20 pb-2">
        <Breadcrumbs />
      </div>

      <section className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
            My Appointments
          </h1>

          {appointments.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              You have no appointments yet.
            </div>
          ) : (
            <div className="space-y-5">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex justify-between items-center border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <FaUserMd className="text-indigo-600 text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {appt.doctorName}
                      </h2>
                      <p className="text-gray-500 text-sm">{appt.specialization}</p>
                      <p className="text-gray-500 text-sm">{appt.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end text-gray-600 text-sm gap-2">
                      <FaCalendarAlt className="text-indigo-600" />
                      {new Date(appt.appointmentDate).toLocaleString()}
                    </div>
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                        appt.status === "scheduled"
                          ? "bg-green-100 text-green-700"
                          : appt.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appt.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyAppointments;
