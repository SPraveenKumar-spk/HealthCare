import { useState } from "react";

export default function FindHospital() {
  const hospitals = [
    { city: "Bangalore", branch: "HSR Layout", address: "HSR Layout, Sector 2", phone: "080-23456789" },
    { city: "Bangalore", branch: "Whitefield", address: "ITPL Main Road", phone: "080-98765432" },
    { city: "Bangalore", branch: "Indiranagar", address: "100ft Road", phone: "080-22334455" },

    { city: "Hyderabad", branch: "Gachibowli", address: "Gachibowli Main Road", phone: "040-22124567" },
    { city: "Hyderabad", branch: "Madhapur", address: "Hi-Tech City", phone: "040-27896543" },
    { city: "Hyderabad", branch: "Kukatpally", address: "KPHB Phase 3", phone: "040-66554433" },

    { city: "Chennai", branch: "Anna Nagar", address: "Anna Nagar West", phone: "044-26781234" },
    { city: "Chennai", branch: "OMR", address: "Old Mahabalipuram Road", phone: "044-28776543" },
    { city: "Chennai", branch: "Tambaram", address: "GST Road", phone: "044-22556677" },

    { city: "Mumbai", branch: "Andheri West", address: "Lokhandwala Circle", phone: "022-24561234" },
    { city: "Mumbai", branch: "Bandra", address: "Bandra West", phone: "022-33221144" },
    { city: "Mumbai", branch: "Navi Mumbai", address: "Vashi Sector 18", phone: "022-99887766" },

    { city: "Delhi", branch: "Dwarka", address: "Dwarka Sector 10", phone: "011-25674321" },
    { city: "Delhi", branch: "Karol Bagh", address: "Pusa Road", phone: "011-44556677" },
    { city: "Delhi", branch: "Saket", address: "Max Road", phone: "011-88997755" },

    { city: "Pune", branch: "Hinjewadi", address: "Phase 1 Rajiv Gandhi Infotech Park", phone: "020-99443322" },
    { city: "Pune", branch: "Kothrud", address: "Paud Road", phone: "020-44556688" },
    { city: "Pune", branch: "Wakad", address: "Near Phoenix Mall", phone: "020-66552233" },

    { city: "Kolkata", branch: "Salt Lake", address: "Sector V", phone: "033-22446688" },
    { city: "Kolkata", branch: "Ballygunge", address: "Gariahat Road", phone: "033-27889944" },
  ];

  const [searchCity, setSearchCity] = useState("");

  const filteredHospitals = hospitals.filter((h) =>
    h.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-24 bg-white shadow-xl rounded-2xl">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center">
        Find Hospital Branches
      </h1>

      {/* Search Filter */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by city name..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="w-full max-w-md px-4 py-3 border rounded-xl shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Hospital Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((h, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-indigo-600">
                {h.city} — {h.branch}
              </h2>
              <p className="text-gray-600 mt-1">{h.address}</p>
              <p className="text-gray-800 font-semibold mt-3">{h.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg">
            No branches found for the entered city.
          </p>
        )}
      </div>
    </div>
  );
}
