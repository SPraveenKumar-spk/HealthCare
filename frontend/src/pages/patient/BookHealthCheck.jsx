import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function BookHealthCheck() {
  const [data, setData] = useState({
    packageName: "",
    date: "",
    notes: "",
  });

  const packages = [
    "Full Body Check-up",
    "Blood Test",
    "ECG / Heart Test",
    "Diabetes Screening",
    "Thyroid Check",
    "Liver Function Test",
    "Women’s Wellness Test",
    "Senior Citizen Package",
  ];

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/health-check", data, { withCredentials: true });
      toast.success("Health check booked!");
      setData({ packageName: "", date: "", notes: "" });
    } catch {
      toast.error("Error booking health check");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md mt-16 rounded-xl">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">
        Book Health Check-up
      </h1>

      <form onSubmit={submit} className="space-y-5">
        <div>
          <label>Choose a Package</label>
          <select
            className="w-full p-3 border rounded-lg"
            value={data.packageName}
            onChange={(e) =>
              setData({ ...data, packageName: e.target.value })
            }
          >
            <option>Select Package</option>
            {packages.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Preferred Date</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>

        <div>
          <label>Notes (Optional)</label>
          <textarea
            className="w-full p-3 border rounded-lg"
            rows="3"
            value={data.notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
          />
        </div>

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
          Book Now
        </button>
      </form>
    </div>
  );
}
