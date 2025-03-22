import { useState, useEffect } from "react";
import {
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaHospital,
} from "react-icons/fa";
import { TbFilterStar } from "react-icons/tb";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import Footer from "../Footer";

const hospitalData = [
  {
    id: 1,
    name: "Apollo Hospitals",
    branch: "Jubilee Hills",
    city: "Hyderabad",
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    departments: ["Emergency", "ICU", "OPD", "Radiology"],
    rating: 4.7,
    reviews: 245,
    bio: "A leading multi-specialty hospital known for advanced medical care.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbdcdc6a0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-4023607777",
    location: "Jubilee Hills, Hyderabad, Telangana",
  },
  {
    id: 2,
    name: "Fortis Healthcare",
    branch: "Vasant Kunj",
    city: "Delhi",
    specialties: ["Oncology", "Cardiology", "Pediatrics"],
    departments: ["Emergency", "Surgery", "Pharmacy"],
    rating: 4.5,
    reviews: 189,
    bio: "Renowned for cutting-edge treatments and patient care.",
    image:
      "https://images.unsplash.com/photo-1586771107445-3b3b1b10c732?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-1142776222",
    location: "Vasant Kunj, New Delhi",
  },
  {
    id: 3,
    name: "Manipal Hospitals",
    branch: "Old Airport Road",
    city: "Bangalore",
    specialties: ["Nephrology", "Gynecology", "Orthopedics"],
    departments: ["ICU", "OPD", "Diagnostics"],
    rating: 4.8,
    reviews: 312,
    bio: "A trusted name in healthcare with comprehensive services.",
    image:
      "https://images.unsplash.com/photo-1631106257377-1f7694a91d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8067505000",
    location: "Old Airport Road, Bangalore, Karnataka",
  },
  {
    id: 4,
    name: "Max Super Speciality",
    branch: "Saket",
    city: "Delhi",
    specialties: ["Oncology", "Neurology", "Cardiology"],
    departments: ["Emergency", "ICU", "Surgery"],
    rating: 4.6,
    reviews: 278,
    bio: "Known for excellence in super-specialty treatments.",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-1126515050",
    location: "Saket, New Delhi",
  },
  {
    id: 5,
    name: "Narayana Health",
    branch: "HSR Layout",
    city: "Bangalore",
    specialties: ["Cardiology", "Pediatrics", "Orthopedics"],
    departments: ["OPD", "Diagnostics", "Pharmacy"],
    rating: 4.7,
    reviews: 230,
    bio: "Affordable healthcare with a focus on patient outcomes.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173fd1c9b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8067515252",
    location: "HSR Layout, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
  {
    id: 6,
    name: "Aster CMI Hospital",
    branch: "Hebbal",
    city: "Bangalore",
    specialties: ["Neurology", "Gastroenterology", "Oncology"],
    departments: ["Emergency", "ICU", "Radiology"],
    rating: 4.9,
    reviews: 350,
    bio: "State-of-the-art facility with a patient-first approach.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    contact: "+91-8043412345",
    location: "Hebbal, Bangalore, Karnataka",
  },
];

function FindHospital() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    specialty: "",
    department: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile View
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ city: "", specialty: "", department: "" });
    setSearchQuery("");
  };

  const filteredHospitals = hospitalData.filter((hospital) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchLower) ||
      hospital.branch.toLowerCase().includes(searchLower) ||
      hospital.city.toLowerCase().includes(searchLower);

    return (
      matchesSearch &&
      (!filters.city || hospital.city === filters.city) &&
      (!filters.specialty ||
        hospital.specialties.includes(filters.specialty)) &&
      (!filters.department || hospital.departments.includes(filters.department))
    );
  });

  return (
    <>
      <Header />
      <div className="md:ps-20 mx-auto bg-gray-100 px-4 pt-20 pb-2">
        <Breadcrumbs />
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-1 pb-8 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto flex gap-6">
            {/* Filters Section */}
            <div
              className={`w-full lg:w-80 lg:flex-shrink-0 ${
                isFilterOpen ? "block mb-6" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Filter Hospitals
                  </h3>
                  {(filters.city ||
                    filters.specialty ||
                    filters.department ||
                    searchQuery) && (
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
                  {/* Search Filter */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      placeholder="Search hospital..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  {[
                    {
                      name: "city",
                      options: ["", "Hyderabad", "Delhi", "Bangalore"],
                    },
                    {
                      name: "specialty",
                      options: [
                        "",
                        "Cardiology",
                        "Neurology",
                        "Orthopedics",
                        "Oncology",
                        "Pediatrics",
                        "Nephrology",
                        "Gynecology",
                        "Gastroenterology",
                      ],
                    },
                    {
                      name: "department",
                      options: [
                        "",
                        "Emergency",
                        "ICU",
                        "OPD",
                        "Radiology",
                        "Surgery",
                        "Pharmacy",
                        "Diagnostics",
                      ],
                    },
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
                  {/* Mobile Filter Toggle */}
                  <div className="lg:hidden flex justify-between items-center">
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

            {/* Hospital List Section */}
            <div className="flex-1 overflow-y-auto max-h-[80vh]">
              <div className="hidden lg:block mb-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                  Find a Hospital
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      onClick={() => setSelectedHospital(hospital)}
                      className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition-all hover:shadow-lg border ${
                        selectedHospital?.id === hospital.id
                          ? "border-indigo-500"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-5">
                        <img
                          src={hospital.image}
                          alt={hospital.name}
                          className="w-16 h-16 rounded-full object-cover shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {hospital.name} - {hospital.branch}
                          </h3>
                          <p className="text-indigo-600 text-sm font-medium">
                            {hospital.city}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            <FaHospital className="inline mr-1" />
                            {hospital.specialties.slice(0, 2).join(", ")}{" "}
                            {hospital.specialties.length > 2 && "+ more"}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {hospital.rating} ★ ({hospital.reviews} reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No hospitals found matching your criteria.
                  </div>
                )}
              </div>
            </div>

            {/* Hospital Details Modal (Mobile) */}
            {selectedHospital && isMobile && (
              <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedHospital.image}
                        alt={selectedHospital.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {selectedHospital.name}
                        </h3>
                        <p className="text-indigo-600 text-sm font-medium">
                          {selectedHospital.branch}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedHospital(null)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <FaTimes className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-5">
                    {selectedHospital.bio}
                  </p>

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Specialties
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {selectedHospital.specialties.map(
                          (specialty, index) => (
                            <li key={index}>{specialty}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Departments
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {selectedHospital.departments.map((dept, index) => (
                          <li key={index}>{dept}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Contact
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaPhone className="mr-2" /> {selectedHospital.contact}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <FaMapMarkerAlt className="mr-2" />{" "}
                        {selectedHospital.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Rating
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedHospital.rating} ★ ({selectedHospital.reviews}{" "}
                        reviews)
                      </p>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md">
                      Contact Hospital
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Hospital Details Sidebar (Desktop) */}
            {selectedHospital && !isMobile && (
              <div className="w-96 flex-shrink-0 sticky top-20 overflow-y-auto max-h-[80vh]">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedHospital.image}
                        alt={selectedHospital.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {selectedHospital.name}
                        </h3>
                        <p className="text-indigo-600 text-sm font-medium">
                          {selectedHospital.branch}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedHospital(null)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <FaTimes className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-5">
                    {selectedHospital.bio}
                  </p>

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Specialties
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {selectedHospital.specialties.map(
                          (specialty, index) => (
                            <li key={index}>{specialty}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Departments
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600">
                        {selectedHospital.departments.map((dept, index) => (
                          <li key={index}>{dept}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Contact
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaPhone className="mr-2" /> {selectedHospital.contact}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <FaMapMarkerAlt className="mr-2" />{" "}
                        {selectedHospital.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Rating
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedHospital.rating} ★ ({selectedHospital.reviews}{" "}
                        reviews)
                      </p>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md">
                      Contact Hospital
                    </button>
                  </div>
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

export default FindHospital;
