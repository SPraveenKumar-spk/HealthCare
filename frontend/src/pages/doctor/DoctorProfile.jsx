import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../api/axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    phone: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [newSlot, setNewSlot] = useState({ dayOfWeek: "", startTime: "", endTime: "" });
  const [onlineSlots, setOnlineSlots] = useState([]);
const [newOnlineSlot, setNewOnlineSlot] = useState({ date: "", endTime: "" });

  const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const element = document.querySelector(location.hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);

  // Fetch doctor profile + schedule
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const profileRes = await api.get("/auth/profile", { withCredentials: true });
        const doctorId = profileRes.data?.user?.doctor?.id;

        if (doctorId) {
  // ...existing fetch calls...
  const slotsRes = await api.get(`/online-consult/doctor/${doctorId}`, { withCredentials: true });
  // This endpoint returns online APPOINTMENTS (bookings) — to list AVAILABLE online slots, call slot list or doctor's slots route:
  const availableSlotsRes = await api.get(`/online-consult/slots`, { withCredentials: true });
  // filter for doctorId
  setOnlineSlots(availableSlotsRes.data.filter(s => s.doctor.id === doctorId));
}
        if (doctorId) {
          const doctorRes = await api.get(`/doctors/${doctorId}`, { withCredentials: true });
          setDoctor(doctorRes.data);
          setFormData({
            fullName: doctorRes.data.fullName,
            specialization: doctorRes.data.specialization,
            phone: doctorRes.data.phone || "",
          });

          // Convert schedule object to array of slots for display
          const slots = [];
          for (const [day, times] of Object.entries(doctorRes.data.schedule || {})) {
            times.forEach((time) => {
              const [start, end] = time.split(" - ");
              slots.push({ dayOfWeek: day, startTime: start, endTime: end });
            });
          }
          setSchedules(slots);
        }
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
      }
    };
    fetchDoctor();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      const res = await api.put(`/doctors/${doctor.id}`, formData, { withCredentials: true });
      alert("Profile updated successfully!");
      setDoctor(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // Add new slot
  const handleAddSlot = async () => {
    try {
      const res = await api.post(`/doctors/${doctor.id}/schedule`, newSlot, { withCredentials: true });
      setSchedules([...schedules, res.data]);
      alert("Schedule slot added!");
      setNewSlot({ dayOfWeek: "", startTime: "", endTime: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add slot");
    }
  };

  // Delete slot
  const handleDeleteSlot = async (slotId) => {
    try {
      await api.delete(`/doctors/schedule/${slotId}`, { withCredentials: true });
      setSchedules(schedules.filter((s) => s.id !== slotId));
      alert("Slot deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!doctor) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <>
      <Header />
      <div className="pt-6 px-6 md:px-20 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Doctor Profile</h2>

        {/* --- Personal Info Section --- */}
        <div id="personal-info" className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">Personal Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <button
            onClick={handleProfileUpdate}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Update Profile
          </button>
        </div>

        {/* --- Schedule Management --- */}
        
        <div id="schedule" className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">Manage Schedule</h3>

          {/* Add Slot Form */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <select
              name="dayOfWeek"
              value={newSlot.dayOfWeek}
              onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: e.target.value })}
              className="p-2 border rounded-lg"
            >
              <option value="">Select Day</option>
              {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input
              type="time"
              value={newSlot.startTime}
              onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="time"
              value={newSlot.endTime}
              onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <button
              onClick={handleAddSlot}
              className="bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Slot
            </button>
          </div>

          {/* Existing Slots */}
          <table className="w-full text-left border">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Day</th>
                <th className="py-2 px-3">Start</th>
                <th className="py-2 px-3">End</th>
                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.length > 0 ? (
                schedules.map((slot, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-3">{slot.dayOfWeek}</td>
                    <td className="py-2 px-3">{slot.startTime}</td>
                    <td className="py-2 px-3">{slot.endTime}</td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No schedule slots yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
  <h4 className="text-lg font-semibold mb-3">Create Online Slot</h4>
  <div className="grid md:grid-cols-3 gap-3">
    <input
      type="datetime-local"
      value={newOnlineSlot.date}
      onChange={(e) => setNewOnlineSlot(prev => ({ ...prev, date: e.target.value }))}
      className="p-2 border rounded-lg"
    />
    <input
      type="datetime-local"
      value={newOnlineSlot.endTime}
      onChange={(e) => setNewOnlineSlot(prev => ({ ...prev, endTime: e.target.value }))}
      className="p-2 border rounded-lg"
    />
    <button
      onClick={async () => {
        try {
          const res = await api.post(`/online-consult/doctor/${doctor.id}/slot`, {
            date: newOnlineSlot.date,
            endTime: newOnlineSlot.endTime,
          }, { withCredentials: true });
          toast.success("Online slot added");
          setOnlineSlots(prev => [...prev, res.data]);
          setNewOnlineSlot({ date: "", endTime: "" });
        } catch (err) {
          console.error(err);
          toast.error("Failed to add online slot");
        }
      }}
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Add Online Slot
    </button>
  </div>

  <div className="mt-4 mb-6">
    <h5 className="font-medium">Your Online Slots</h5>
    <div className="space-y-2 mt-2">
      {onlineSlots.length === 0 ? <p className="text-gray-500">No online slots yet.</p> :
        onlineSlots.map(s => (
          <div key={s.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <div className="font-medium">{new Date(s.date).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Ends: {new Date(s.endTime).toLocaleString()}</div>
            </div>
            <div className="text-sm">{s.isBooked ? "Booked" : "Available"}</div>
          </div>
        ))
      }
    </div>
  </div>
</div>
      </div>
      <Footer />
    </>
  );
}

export default DoctorProfile;
