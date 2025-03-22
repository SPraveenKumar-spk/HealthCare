import { useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaPrescriptionBottleAlt,
  FaHeartbeat,
  FaCalendarCheck,
  FaFileMedical,
  FaAmbulance,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Services() {
  const navigate = useNavigate();

  const handleServiceInquiry = () => {
    navigate("/contact");
  };

  const services = [
    {
      title: "Telemedicine",
      description:
        "Access virtual consultations from the comfort of your home.",
      icon: <FaVideo className="text-teal-500 text-5xl mb-4" />,
    },
    {
      title: "E-Prescriptions",
      description:
        "Receive prescriptions directly to your device securely and quickly.",
      icon: (
        <FaPrescriptionBottleAlt className="text-purple-500 text-5xl mb-4" />
      ),
    },
    {
      title: "Health Monitoring",
      description:
        "Track your vitals and health progress through smart monitoring.",
      icon: <FaHeartbeat className="text-red-500 text-5xl mb-4" />,
    },
    {
      title: "Appointment Scheduling",
      description:
        "Book appointments easily with your preferred healthcare provider.",
      icon: <FaCalendarCheck className="text-green-500 text-5xl mb-4" />,
    },
    {
      title: "Medical Records",
      description: "Securely access and manage your medical records anytime.",
      icon: <FaFileMedical className="text-indigo-500 text-5xl mb-4" />,
    },
    {
      title: "Emergency Care",
      description:
        "Quick access to emergency services and immediate medical help.",
      icon: <FaAmbulance className="text-orange-500 text-5xl mb-4" />,
    },
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "You can easily book an appointment through our online portal by selecting your preferred service and time.",
    },
    {
      question: "Are telemedicine consultations secure?",
      answer:
        "Yes, all telemedicine consultations are encrypted and fully secure.",
    },
    {
      question: "Can I access my medical records online?",
      answer:
        "Yes, you can securely access and manage your medical records through your account.",
    },
    {
      question: "What should I do in case of an emergency?",
      answer:
        "In case of an emergency, please contact emergency services immediately or use the Emergency Care option for quick assistance.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-25 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600">
            Explore the range of healthcare services we offer to ensure your
            well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-2xl hover:shadow-xl transition duration-300"
            >
              {service.icon}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleServiceInquiry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
          >
            Inquire About Services
          </button>
        </div>
      </div>
      <section id="faq">
        <div className="max-w-6xl mx-auto py-10">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h4 className="text-xl font-semibold text-gray-800">
                    {faq.question}
                  </h4>
                  <FaChevronDown
                    className={`text-gray-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="pt-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
