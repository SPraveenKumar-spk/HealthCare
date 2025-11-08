import Header from "../../../components/Header";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FaTimes, FaSearch } from "react-icons/fa";
import { TbFilterStar } from "react-icons/tb";
import Footer from "../../../components/Footer";
import { useState, useEffect } from "react";
import api from "../../../api/axios";

// const doctorData = [
//   {
//     id: 1,
//     name: "Dr. Ayesha Khan",
//     speciality: "Cardiologist",
//     city: "Mumbai",
//     language: "Hindi, English",
//     gender: "Female",
//     bio: "Expert in heart conditions with 15+ years of experience.",
//     image:
//       "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: ["10:00 AM - 12:00 PM"],
//       Monday: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
//       Tuesday: ["10:00 AM - 12:00 PM"],
//       Wednesday: [],
//       Thursday: ["10:00 AM - 12:00 PM"],
//       Friday: ["3:00 PM - 5:00 PM"],
//       Saturday: [],
//     },
//   },
//   {
//     id: 2,
//     name: "Dr. Ravi Sharma",
//     speciality: "Dermatologist",
//     city: "Delhi",
//     language: "English, Hindi",
//     gender: "Male",
//     bio: "Specializes in skin conditions with 12 years of expertise.",
//     image:
//       "https://images.unsplash.com/photo-1612349317154-3c9ba00a47cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: [],
//       Monday: ["11:00 AM - 1:00 PM"],
//       Tuesday: ["11:00 AM - 1:00 PM", "4:00 PM - 6:00 PM"],
//       Wednesday: ["4:00 PM - 6:00 PM"],
//       Thursday: [],
//       Friday: ["11:00 AM - 1:00 PM"],
//       Saturday: ["11:00 AM - 1:00 PM"],
//     },
//   },
//   {
//     id: 3,
//     name: "Dr. Priya Menon",
//     speciality: "Gynecologist",
//     city: "Bangalore",
//     language: "Kannada, English",
//     gender: "Female",
//     bio: "Renowned gynecologist with 10 years of experience.",
//     image:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: ["9:00 AM - 11:00 AM"],
//       Monday: [],
//       Tuesday: ["9:00 AM - 11:00 AM"],
//       Wednesday: ["2:00 PM - 4:00 PM"],
//       Thursday: ["9:00 AM - 11:00 AM"],
//       Friday: [],
//       Saturday: ["2:00 PM - 4:00 PM"],
//     },
//   },
//   {
//     id: 4,
//     name: "Dr. Vikram Patel",
//     speciality: "Neurologist",
//     city: "Chennai",
//     language: "Tamil, English",
//     gender: "Male",
//     bio: "Expert in neurological disorders with 18 years of practice.",
//     image:
//       "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: [],
//       Monday: ["10:00 AM - 12:00 PM"],
//       Tuesday: ["2:00 PM - 4:00 PM"],
//       Wednesday: ["10:00 AM - 12:00 PM"],
//       Thursday: [],
//       Friday: ["2:00 PM - 4:00 PM"],
//       Saturday: ["10:00 AM - 12:00 PM"],
//     },
//   },
//   {
//     id: 5,
//     name: "Dr. Neha Gupta",
//     speciality: "Pediatrician",
//     city: "Pune",
//     language: "Marathi, English",
//     gender: "Female",
//     bio: "Caring pediatrician with 8 years of experience.",
//     image:
//       "https://images.unsplash.com/photo-1598887142488-5b8b9e56d73b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: ["11:00 AM - 1:00 PM"],
//       Monday: ["9:00 AM - 11:00 AM"],
//       Tuesday: [],
//       Wednesday: ["11:00 AM - 1:00 PM"],
//       Thursday: ["9:00 AM - 11:00 AM"],
//       Friday: [],
//       Saturday: ["11:00 AM - 1:00 PM"],
//     },
//   },
//   {
//     id: 6,
//     name: "Dr. Sanjay Rao",
//     speciality: "Orthopedist",
//     city: "Hyderabad",
//     language: "Telugu, English",
//     gender: "Male",
//     bio: "Specialist in bone and joint issues with 14 years of experience.",
//     image:
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: [],
//       Monday: ["3:00 PM - 5:00 PM"],
//       Tuesday: ["10:00 AM - 12:00 PM"],
//       Wednesday: [],
//       Thursday: ["3:00 PM - 5:00 PM"],
//       Friday: ["10:00 AM - 12:00 PM"],
//       Saturday: [],
//     },
//   },
//   {
//     id: 7,
//     name: "Dr. Meera Desai",
//     speciality: "Ophthalmologist",
//     city: "Ahmedabad",
//     language: "Gujarati, English",
//     gender: "Female",
//     bio: "Eye care specialist with 11 years of experience.",
//     image:
//       "https://images.unsplash.com/photo-1595877477518-42447fd153e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: ["10:00 AM - 12:00 PM"],
//       Monday: [],
//       Tuesday: ["2:00 PM - 4:00 PM"],
//       Wednesday: ["10:00 AM - 12:00 PM"],
//       Thursday: [],
//       Friday: ["2:00 PM - 4:00 PM"],
//       Saturday: ["10:00 AM - 12:00 PM"],
//     },
//   },
//   {
//     id: 8,
//     name: "Dr. Arjun Singh",
//     speciality: "Pulmonologist",
//     city: "Kolkata",
//     language: "Bengali, English",
//     gender: "Male",
//     bio: "Lung specialist with 13 years of expertise.",
//     image:
//       "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: [],
//       Monday: ["11:00 AM - 1:00 PM"],
//       Tuesday: [],
//       Wednesday: ["3:00 PM - 5:00 PM"],
//       Thursday: ["11:00 AM - 1:00 PM"],
//       Friday: [],
//       Saturday: ["3:00 PM - 5:00 PM"],
//     },
//   },
//   {
//     id: 9,
//     name: "Dr. Lakshmi Nair",
//     speciality: "Endocrinologist",
//     city: "Kochi",
//     language: "Malayalam, English",
//     gender: "Female",
//     bio: "Hormone specialist with 9 years of experience.",
//     image:
//       "https://images.unsplash.com/photo-1582750433449-648ed127bb58?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: ["9:00 AM - 11:00 AM"],
//       Monday: ["2:00 PM - 4:00 PM"],
//       Tuesday: [],
//       Wednesday: ["9:00 AM - 11:00 AM"],
//       Thursday: ["2:00 PM - 4:00 PM"],
//       Friday: [],
//       Saturday: [],
//     },
//   },
//   {
//     id: 10,
//     name: "Dr. Karan Malhotra",
//     speciality: "Urologist",
//     city: "Jaipur",
//     language: "Hindi, English",
//     gender: "Male",
//     bio: "Expert in urinary tract issues with 16 years of practice.",
//     image:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
//     schedule: {
//       Sunday: [],
//       Monday: ["10:00 AM - 12:00 PM"],
//       Tuesday: ["3:00 PM - 5:00 PM"],
//       Wednesday: [],
//       Thursday: ["10:00 AM - 12:00 PM"],
//       Friday: ["3:00 PM - 5:00 PM"],
//       Saturday: [],
//     },
//   },
// ];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
const [doctorData, setDoctorData] = useState([]);
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors", { withCredentials: true });
      setDoctorData(res.data);
    } catch (err) {
      console.log("Error fetching doctors:", err);
    }
  };
  fetchDoctors();
}, []);

  const [selectedSlot, setSelectedSlot] = useState({ day: "", time: "" });
  const [filters, setFilters] = useState({
    city: "",
    speciality: "",
    language: "",
    gender: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); //For Search Filter
  const [isMobile, setIsMobile] = useState(false); // Track mobile view

  //Detect Mobile View
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Set initial value
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ city: "", speciality: "", language: "", gender: "" });
  };

  const filteredDoctors = doctorData.filter((doctor) => {
    const searchLower = searchTerm.toLowerCase();
    const doctorNameLower = doctor.fullName.toLowerCase();
const doctorSpecialityLower = doctor.specialization.toLowerCase();


    const searchCondition =
      searchTerm === "" ||
      doctorNameLower.includes(searchLower) ||
      doctorSpecialityLower.includes(searchLower);

    return (
      searchCondition &&
      (!filters.city || doctor.city === filters.city) &&
      (!filters.speciality || doctor.speciality === filters.speciality) &&
      (!filters.language || doctor.language.includes(filters.language)) &&
      (!filters.gender || doctor.gender === filters.gender)
    );
  });

  const handleSlotSelect = (day, time) => {
    setSelectedSlot({ day, time });
  };

  const handleBooking = () => {
    if (selectedDoctor && selectedSlot.day && selectedSlot.time) {
      alert(
        `Appointment booked with ${selectedDoctor.name} on ${selectedSlot.day} at ${selectedSlot.time}`
      );
      setSelectedSlot({ day: "", time: "" }); // Reset slot after booking
      setSelectedDoctor(null); //Close Doctor Detail Sidebar After Booking
    } else {
      alert("Please select a time slot");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="md:ps-20 mx-auto bg-gray-100  px-4 pt-20 pb-2">
        <Breadcrumbs />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 pb-8 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex  gap-6">
            <div
              className={`w-full lg:w-80 lg:flex-shrink-0 ${
                isFilterOpen ? "block mb-6" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Filter Doctors
                  </h3>
                  {(filters.city ||
                    filters.speciality ||
                    filters.language ||
                    filters.gender) && (
                    <button
                      onClick={clearFilters}
                      className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      title="Clear Filters"
                    >
                      <FaTimes className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
                <div className="space-y-5">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      placeholder="Search doctor..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    />
                  </div>

                  {[
                    {
                      name: "city",
                      options: [
                        "",
                        "Mumbai",
                        "Delhi",
                        "Bangalore",
                        "Chennai",
                        "Pune",
                        "Hyderabad",
                        "Ahmedabad",
                        "Kolkata",
                        "Kochi",
                        "Jaipur",
                      ],
                    },
                    {
                      name: "speciality",
                      options: [
                        "",
                        "Cardiologist",
                        "Dermatologist",
                        "Gynecologist",
                        "Neurologist",
                        "Pediatrician",
                        "Orthopedist",
                        "Ophthalmologist",
                        "Pulmonologist",
                        "Endocrinologist",
                        "Urologist",
                      ],
                    },
                    {
                      name: "language",
                      options: [
                        "",
                        "Hindi",
                        "English",
                        "Kannada",
                        "Tamil",
                        "Marathi",
                        "Telugu",
                        "Gujarati",
                        "Bengali",
                        "Malayalam",
                      ],
                    },
                    { name: "gender", options: ["", "Male", "Female"] },
                  ].map((filter) => (
                    <select
                      key={filter.name}
                      name={filter.name}
                      value={filters[filter.name]}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 bg-white shadow-sm transition-all"
                    >
                      <option value="">{`Select ${
                        filter.name.charAt(0).toUpperCase() +
                        filter.name.slice(1)
                      }`}</option>
                      {filter.options.slice(1).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ))}
                  <div className="lg:hidden flex justify-between items-center mb-4 ">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      <TbFilterStar size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor List Section */}
            <div className="flex-1 overflow-y-auto max-h-[80vh]">
              {" "}
              {/* Adjust max-h as needed */}
              <div className="hidden lg:block mb-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                  Find a Doctor
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition-all hover:shadow-lg border ${
                        selectedDoctor?.id === doctor.id
                          ? "border-indigo-500"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-5">
                        <img
                          src={doctor.image}
                          alt={doctor.fullName}
                          className="w-16 h-16 rounded-full object-cover shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {doctor.fullName}
                            </h3>
                            <p className="text-indigo-600 text-sm font-medium">
                            {doctor.specialization}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                            Schedule not added yet
                            </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No doctors found matching your criteria.
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Details Modal (Mobile) */}
            {selectedDoctor && isMobile && (
              <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {selectedDoctor.name}
                        </h3>
                        <p className="text-indigo-600 text-sm font-medium">
                          {selectedDoctor.speciality}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <FaTimes className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-5">
                    {selectedDoctor.bio}
                  </p>

                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Availability
                  </h4>
                  <div className="space-y-4">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="border-b border-gray-200 pb-3">
                        <p className="text-sm font-medium text-gray-700">
                          {day}
                        </p>
                        {selectedDoctor.schedule[day].length > 0 ? (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {selectedDoctor.schedule[day].map((time, index) => (
                              <button
                                key={index}
                                onClick={() => handleSlotSelect(day, time)}
                                className={`p-2 rounded-lg text-sm border transition-all ${
                                  selectedSlot.day === day &&
                                  selectedSlot.time === time
                                    ? "bg-indigo-100 border-indigo-500 text-indigo-700 font-medium"
                                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 mt-1">
                            Not Available
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!selectedSlot.day || !selectedSlot.time}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}

            {/* Doctor Details Sidebar (Desktop) */}
            {selectedDoctor && !isMobile && (
              <div className="w-96 flex-shrink-0 sticky top-20 overflow-y-auto max-h-[80vh]">
                {" "}
                {/*Adjust max-h and enable scrolling */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {selectedDoctor.name}
                        </h3>
                        <p className="text-indigo-600 text-sm font-medium">
                          {selectedDoctor.speciality}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <FaTimes className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-5">
                    {selectedDoctor.bio}
                  </p>

                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Availability
                  </h4>
                  <div className="space-y-4">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="border-b border-gray-200 pb-3">
                        <p className="text-sm font-medium text-gray-700">
                          {day}
                        </p>
                        {selectedDoctor.schedule[day].length > 0 ? (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {selectedDoctor.schedule[day].map((time, index) => (
                              <button
                                key={index}
                                onClick={() => handleSlotSelect(day, time)}
                                className={`p-2 rounded-lg text-sm border transition-all ${
                                  selectedSlot.day === day &&
                                  selectedSlot.time === time
                                    ? "bg-indigo-100 border-indigo-500 text-indigo-700 font-medium"
                                    : "border-gray-200 hover:bg-gray-50 text-gray-600"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 mt-1">
                            Not Available
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!selectedSlot.day || !selectedSlot.time}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookAppointment;
