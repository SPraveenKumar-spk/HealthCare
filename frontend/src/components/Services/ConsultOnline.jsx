import { useState } from "react";
import {
  FaVideo,
  FaPhoneAlt,
  FaCommentDots,
  FaStethoscope,
  FaLeaf,
  FaBrain,
  FaHeart,
  FaBaby,
  FaTooth,
  FaSearch,
} from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Header from "../Header";
import Footer from "../Footer";
import Breadcrumbs from "../Breadcrumbs";

const specialties = [
  {
    id: 1,
    name: "General Physician",
    icon: <FaStethoscope className="text-blue-500" />,
  },
  { id: 2, name: "Dermatologist", icon: <FaLeaf className="text-green-500" /> },
  {
    id: 3,
    name: "Psychiatrist",
    icon: <FaBrain className="text-purple-500" />,
  },
  { id: 4, name: "Cardiologist", icon: <FaHeart className="text-red-500" /> },
  { id: 5, name: "Pediatrician", icon: <FaBaby className="text-pink-500" /> },
  { id: 6, name: "Dentist", icon: <FaTooth className="text-yellow-500" /> },
];

const doctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    specialty: "General Physician",
    experience: "10 years",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Alice Williams",
    specialty: "Dermatologist",
    experience: "8 years",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Dr. Mark Lee",
    specialty: "Psychiatrist",
    experience: "12 years",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Dr. Emma Watson",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Dr. Sophia Brown",
    specialty: "Pediatrician",
    experience: "9 years",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Dr. Michael Adams",
    specialty: "Dentist",
    experience: "7 years",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Dr. Linda Johnson",
    specialty: "General Physician",
    experience: "11 years",
    rating: 4.6,
  },
  {
    id: 8,
    name: "Dr. Kevin White",
    specialty: "Cardiologist",
    experience: "14 years",
    rating: 4.8,
  },
  {
    id: 9,
    name: "Dr. Rachel Green",
    specialty: "Dermatologist",
    experience: "6 years",
    rating: 4.3,
  },
];

const ConsultOnline = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    const filtered = doctors.filter((doc) => doc.specialty === specialty.name);
    setFilteredDoctors(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(term) ||
        doc.specialty.toLowerCase().includes(term)
    );
    setFilteredDoctors(filtered);
  };

  const handleConsultation = (type, doctor) => {
    console.log(`Starting ${type} consultation with ${doctor.name}`);
    // Add API call or navigation logic here
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 py-10 pt-25">
        <Breadcrumbs />
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Consult Online with Top Doctors
          </h2>
          <p className="text-gray-600">
            Book video, audio, or chat consultations with experienced doctors
          </p>
          <div className="mt-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search doctors or specialties..."
              className="p-3 w-3/4 md:w-1/2 border rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="ml-2 text-gray-500" />
          </div>
        </div>

        {/* Specialty Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              onClick={() => handleSpecialtySelect(specialty)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedSpecialty?.id === specialty.id
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="text-3xl mb-2 flex justify-center">
                {specialty.icon}
              </div>
              <p className="text-sm font-semibold text-center">
                {specialty.name}
              </p>
            </div>
          ))}
        </div>

        {/* Doctor List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.specialty}</p>
              <p className="text-sm text-gray-400">
                Experience: {doctor.experience}
              </p>
              <p className="flex  gap-2 text-sm text-yellow-500">
                <FaStar /> {doctor.rating}/5
              </p>

              {/* Consultation Options */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                  onClick={() => handleConsultation("Video", doctor)}
                >
                  <FaVideo className="mr-2" /> Video
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 flex items-center"
                  onClick={() => handleConsultation("Audio", doctor)}
                >
                  <FaPhoneAlt className="mr-2" /> Audio
                </button>
                <button
                  className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 flex items-center"
                  onClick={() => handleConsultation("Chat", doctor)}
                >
                  <FaCommentDots className="mr-2" /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConsultOnline;
