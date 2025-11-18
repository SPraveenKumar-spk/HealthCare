// src/pages/patient/ConsultOnline.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ConsultOnline() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notes, setNotes] = useState("");
  const [booking, setBooking] = useState(false);
  const [appointmentLink, setAppointmentLink] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/online-consult/slots", { withCredentials: true });
        setSlots(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load online slots");
      }
    };
    load();
  }, []);

  const book = async () => {
    if (!selectedSlot) return toast.warn("Please select a slot");
    setBooking(true);
    try {
      const res = await api.post("/online-consult/book", { slotId: selectedSlot, notes }, { withCredentials: true });
      toast.success("Online consultation booked!");
      const appt = res.data.appointment;
      setAppointmentLink(appt.meetingUrl || "");
      // refresh slots
      const s = await api.get("/online-consult/slots", { withCredentials: true });
      setSlots(s.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-20 px-4 md:px-12 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">Consult Online</h1>

          {appointmentLink ? (
            <div className="bg-white p-6 rounded-xl shadow mb-6 text-center">
              <p className="mb-4">Your meeting is ready — join from the link below:</p>
              <a className="text-blue-600 underline" href={appointmentLink} target="_blank" rel="noreferrer">{appointmentLink}</a>
            </div>
          ) : null}

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <p className="text-gray-600 mb-4">Select a slot below. Slots are shown from doctors who provide online consults.</p>

            <div className="space-y-3">
              {slots.length === 0 && <p className="text-gray-500">No online slots available at the moment.</p>}

              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center ${selectedSlot === slot.id ? "border-indigo-600 bg-indigo-50" : ""}`}
                >
                  <div>
                    <div className="font-semibold">Dr. {slot.doctor.fullName} <span className="text-sm text-gray-500">({slot.doctor.specialization})</span></div>
                    <div className="text-sm text-gray-600 mt-1">{new Date(slot.date).toLocaleString()}</div>
                    {slot.doctor.phone && <div className="text-sm text-gray-500 mt-1">Phone: {slot.doctor.phone}</div>}
                  </div>
                  <div className="text-sm text-gray-600">{slot.isBooked ? "Booked" : "Available"}</div>
                </div>
              ))}
            </div>

            <textarea
              placeholder="Describe your symptoms (optional)"
              className="w-full mt-4 p-3 border rounded-lg"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button
              onClick={book}
              disabled={!selectedSlot || booking}
              className="w-full mt-4 py-3 rounded-lg text-white bg-indigo-600 disabled:bg-gray-300"
            >
              {booking ? "Booking..." : "Book Consultation"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
