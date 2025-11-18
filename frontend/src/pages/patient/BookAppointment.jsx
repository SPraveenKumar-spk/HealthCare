import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import { FaTimes, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../../api/axios";

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function BookAppointment() {
  const [doctorData, setDoctorData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState({ day: "", time: "" });
  const [notes, setNotes] = useState("");
  const [filters, setFilters] = useState({ speciality: "", gender: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/doctors", { withCredentials: true });
        console.log("Fetched Doctors:", res.data);
        setDoctorData(res.data || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredDoctors = doctorData.filter((doctor) => {
    const name = (doctor.fullName || "").toLowerCase();
    const specialization = (doctor.specialization || "").toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || name.includes(searchLower) || specialization.includes(searchLower);
    const matchesSpeciality = !filters.speciality || (doctor.specialization || "").toLowerCase() === filters.speciality.toLowerCase();
    const matchesGender = !filters.gender || (doctor.gender || "").toLowerCase() === filters.gender.toLowerCase();
    return matchesSearch && matchesSpeciality && matchesGender;
  });

  const handleDoctorClick = async (doctorId) => {
    try {
      const res = await api.get(`/doctors/${doctorId}`, { withCredentials: true });
      let doctor = res.data;

      // normalize schedule:
      if (!doctor.schedule && Array.isArray(doctor.schedules)) {
        const grouped = {};
        doctor.schedules.forEach(s => {
          if (!grouped[s.dayOfWeek]) grouped[s.dayOfWeek] = [];
          grouped[s.dayOfWeek].push(`${s.startTime} - ${s.endTime}`);
        });
        doctor.schedule = grouped;
      }

      // if backend returns schedule in list form already, fine
      setSelectedDoctor(doctor);
      setSelectedSlot({ day: "", time: "" });
      setNotes("");
      console.log("Selected Doctor:", doctor);
    } catch (err) {
      console.error("Error loading doctor details:", err);
      alert("Failed to load doctor details.");
    }
  };

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedSlot.day || !selectedSlot.time) {
      alert("Please select a doctor and a time slot.");
      return;
    }

    try {
      const appointmentDate = new Date();
      const [startTime] = selectedSlot.time.split(" - ");
      const [hoursStr, minutesStr] = startTime.split(":");
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      appointmentDate.setHours(hours, minutes, 0, 0);

      const payload = {
        doctorId: selectedDoctor.id,
        appointmentDate: appointmentDate.toISOString(),
        notes,
      };

      const res = await api.post("/appointments", payload, { withCredentials: true });
      console.log("Booking Response:", res.data);
      if (res.status === 201) {
        alert("Appointment booked successfully.");
        setSelectedDoctor(null);
        setSelectedSlot({ day: "", time: "" });
        setNotes("");
      } else {
        alert("Unexpected response when booking. Check console.");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      if (err?.response?.data?.error) alert(err.response.data.error);
      else alert("Failed to book appointment. See console for details.");
    }
  };

  return (
    <>
      <Header />
      <div className="md:ps-20 mx-auto bg-gray-100 px-4 pt-20 pb-2">
        <Breadcrumbs />
      </div>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 pb-8 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex gap-6">
            {/* Filter sidebar (desktop) */}
            <div className="w-full lg:w-80 lg:flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter Doctors</h3>

                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch className="w-5 h-5 text-gray-400" />
                  </div>
                  <input placeholder="Search doctor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50" />
                </div>

                <select value={filters.speciality} onChange={(e) => setFilters(prev => ({...prev, speciality: e.target.value}))}
                  className="w-full mb-4 p-3 border border-gray-200 rounded-lg">
                  <option value="">Select Speciality</option>
                  {["Cardiologist","Dermatologist","Neurologist","Orthopedist","Pediatrician","General"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select value={filters.gender} onChange={(e) => setFilters(prev => ({...prev, gender: e.target.value}))}
                  className="w-full mb-4 p-3 border border-gray-200 rounded-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Doctor list */}
            <div className="flex-1 overflow-y-auto max-h-[80vh]">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Find a Doctor</h2>

              {loadingDoctors ? <p className="text-center">Loading doctors...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDoctors.length > 0 ? filteredDoctors.map(doctor => (
                    <div key={doctor.id} onClick={() => handleDoctorClick(doctor.id)}
                      className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition-all hover:shadow-lg border ${selectedDoctor?.id === doctor.id ? "border-indigo-500" : "border-gray-200"}`}>
                      <div className="flex items-center space-x-5">
                        <img src={doctor.imageUrl || "https://cdn-icons-png.flaticon.com/512/387/387561.png"} alt={doctor.fullName} className="w-16 h-16 rounded-full object-cover" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{doctor.fullName}</h3>
                          <p className="text-indigo-600 text-sm font-medium">{doctor.specialization}</p>
                          <p className="text-gray-500 text-xs mt-1">{Object.keys(doctor.schedule || {}).length > 0 ? "Slots available" : "No schedule added"}</p>
                        </div>
                      </div>
                    </div>
                  )) : <p className="text-center text-gray-500">No doctors found.</p>}
                </div>
              )}
            </div>

            {/* Doctor details sidebar */}
            {selectedDoctor && !isMobile && (
              <div className="w-96 flex-shrink-0 sticky top-20 overflow-y-auto max-h-[80vh]">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center space-x-4">
                      <img src={selectedDoctor.imageUrl || "https://cdn-icons-png.flaticon.com/512/387/387561.png"} alt={selectedDoctor.fullName} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{selectedDoctor.fullName}</h3>
                        <p className="text-indigo-600 text-sm font-medium">{selectedDoctor.specialization}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedDoctor(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <FaTimes />
                    </button>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Availability</h4>

                  <div className="space-y-4">
                    {daysOfWeek.map(day => (
                      <div key={day} className="border-b border-gray-200 pb-3">
                        <p className="text-sm font-medium text-gray-700">{day}</p>
                        {selectedDoctor.schedule?.[day]?.length > 0 ? (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {selectedDoctor.schedule[day].map((time, idx) => (
                              <button key={idx} onClick={() => setSelectedSlot({ day, time })}
                                className={`p-2 rounded-lg text-sm border ${selectedSlot.day === day && selectedSlot.time === time ? "bg-indigo-100 border-indigo-500 text-indigo-700" : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}>
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 mt-1">Not Available</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Short note for doctor" className="w-full border rounded-lg p-2 text-sm" rows={2} />
                  </div>

                  <button onClick={handleBooking} disabled={!selectedSlot.day || !selectedSlot.time}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg disabled:bg-gray-400">
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
