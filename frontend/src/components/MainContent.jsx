import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/Banner1.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img8 from "../assets/img8.jpg";

import { TbCalendarUser } from "react-icons/tb";
import { FaLungsVirus, FaEye, FaBaby, FaXRay, FaTooth } from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { LiaLaptopMedicalSolid } from "react-icons/lia";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { PiHeadCircuitDuotone } from "react-icons/pi";
import { GiKidneys, GiLegArmor } from "react-icons/gi";
import { FaHandsHoldingChild } from "react-icons/fa6";

import Hospital from "../assets/Hospital.jpg";
import SpecialCare from "../assets/SpecialCare.jpg";

import Testimonials from "./Testimonials";
import Blogs from "./Blogs";

function MainContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------------------------------------------
  // UNIVERSAL PROTECTED ROUTE HANDLER
  // ---------------------------------------------
  const handleProtectedAction = (path) => {
    if (!user) {
      navigate("/login", {
        state: { message: "Please login to continue." },
      });
      return;
    }

    if (user.role === "patient") {
      navigate(path);
      return;
    }
    if (user.role === "doctor") {
      navigate("/doctor");
      return;
    }
    if (user.role === "admin") {
      navigate("/admin");
      return;
    }
  };

  const slides = [
    {
      img: img5,
      title: "Stay Healthy, Stay Happy - Let’s Begin Your Care Journey.",
      description:
        "Prioritize your well-being today. Book an appointment and take control of your health.",
      style:
        "w-[50%] text-[#003B5C] pt-3 md:top-[40%] md:left-[30%] top-[40%] left-[26%] drop-shadow-lg",
      action: true,
      buttonData: "Book Appointment",
      href: "/patient/book",
      protected: true,
    },
    {
      img: img4,
      title: "Expert Doctors, Trusted Care, Exceptional Healing",
      description:
        "Providing world-class healthcare with empathy, cutting-edge technology, and a patient-first approach.",
      style:
        "w-[80%] md:w-[50%] top-[40%] left-[30%] text-gray-900 p-6 drop-shadow-lg",
      action: true,
      buttonData: "Know More",
      href: "/about",
      protected: false,
    },
    {
      img: img3,
      title: "Empowering Healthier Lives, One Patient at a Time.",
      description:
        "Expert care and advanced health check-ups designed just for you.",
      style:
        "md:w-[50%] w-[60%] text-[#2D2D2D] md:top-[35%] md:left-[30%] left-[30%] drop-shadow-lg",
      action: true,
      buttonData: "Book Health Check-up",
      href: "/patient/book",
      protected: true,
    },
    {
      img: img1,
      title: "Advanced Care, Trusted Pharmacy, Precision Diagnostics.",
      description:
        "Complete healthcare with cutting-edge labs, expert care, and quality medications.",
      style: "w-[50%] md:top-[45%] md:left-[72%] left-[70%]",
      action: true,
      buttonData: "Explore Now",
      href: "/services",
      protected: false,
    },
    {
      img: img8,
      title:
        " ~ The good physician treats the disease; the great physician treats the patient who has the disease. ~",
      description: "— Sir William Osler",
      style: "w-[50%] top-[45%] left-[70%] text-[#5A3E2B]",
      action: false,
    },
  ];

  return (
    <>
      <div>
        <section>
          <div className="w-full mx-auto mt-7 md:mt-20">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="relative">
                  <img
                    src={slide.img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[250px] md:h-[600px] max-h-[650px] sm:max-h-[350px] md:max-h-[550px] lg:max-h-[550px] xl:max-h-[650px] md:object-cover object-contain"
                  />

                  <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ${slide.style}`}
                  >
                    <h2 className="text-sm md:text-5xl pt-10 font-bold leading-snug text-center">
                      {slide.title}
                    </h2>

                    <p className="hidden md:block md:text-2xl mt-3 text-center">
                      {slide.description}
                    </p>

                    {slide.action && (
                      <div className="md:pt-10 pt-5 mb-3 md:text-center">
                        {slide.protected ? (
                          <button
                            onClick={() => handleProtectedAction(slide.href)}
                            className="bg-[#F4A259] text-white text-md md:p-4 p-2 md:px-6 rounded-lg hover:bg-[rgb(244,143,89)]"
                          >
                            {slide.buttonData}
                          </button>
                        ) : (
                          <NavLink
                            className="bg-[#F4A259] text-white text-md md:p-4 p-2 md:px-6 rounded-lg hover:bg-[rgb(244,143,89)]"
                            to={slide.href}
                          >
                            {slide.buttonData}
                          </NavLink>
                        )}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section>
          <div className="flex flex-col justify-center items-center bg-white w-full min-h-[40vh] text-gray-800">
            <h2 className="text-3xl text-center py-3 md:py-0 sm:py-6">
              How Can We Assist You Today?
            </h2>

           <div className="p-6 flex flex-nowrap">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-auto cursor-pointer text-center">

    <div
      onClick={() => handleProtectedAction("/patient/book")}
      className="bg-white p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300"
    >
      <TbCalendarUser className="text-gray-600 mx-auto" size={40} />
      <p className="text-gray-600 pt-3">Book Appointment</p>
    </div>
    <div
      onClick={() => navigate("/patient/find-hospital")}
      className="bg-white p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300"
    >
      <CiHospital1 className="text-gray-600 mx-auto" size={40} />
      <p className="text-gray-600 pt-3">Find Hospital</p>
    </div>

    <div
      onClick={() => handleProtectedAction("/patient/health-checkup")}
      className="bg-white p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300"
    >
      <FaPersonCircleCheck className="text-gray-600 mx-auto" size={40} />
      <p className="text-gray-600 pt-3">Book Health Check-up</p>
    </div>
    <div
      onClick={() => handleProtectedAction("/patient/consult-online")}
      className="bg-white p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300"
    >
      <LiaLaptopMedicalSolid className="text-gray-600 mx-auto" size={40} />
      <p className="text-gray-600 pt-3">Consult Online</p>
    </div>

  </div>
</div>

          </div>
        </section>


        <section id="#explore">
          <div className="mt-2 w-full min-h-[30vh]">
            <h3 className="text-3xl text-center pt-5">
              Explore Our Specialized Care Departments
            </h3>

            <p className="text-gray-700 pt-4 px-10 text-center">
              At HealthCare, we provide expert medical attention across a wide range
              of medical specialties.
            </p>

            <div className="flex flex-wrap justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 p-6 cursor-pointer">
                {[
                  { icon: MdOutlineMonitorHeart, name: "Cardiology" },
                  { icon: FaLungsVirus, name: "Pulmonology" },
                  { icon: GiKidneys, name: "Nephrology" },
                  { icon: FaHandsHoldingChild, name: "Pediatrics" },
                  { icon: PiHeadCircuitDuotone, name: "Neurology" },
                  { icon: FaEye, name: "Ophthalmology" },
                  { icon: FaBaby, name: "Neonatology" },
                  { icon: FaXRay, name: "Radiology" },
                  { icon: FaTooth, name: "Dentistry" },
                  { icon: GiLegArmor, name: "Orthopedic" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleProtectedAction("/patient/book")}
                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                  >
                    <item.icon
                      size={40}
                      className="mx-auto block text-orange-500"
                    />
                    <h4 className="text-1xl text-center mt-2">{item.name}</h4>
                  </div>
                ))}
              </div>

              <div>
                <img
                  src={SpecialCare}
                  alt="special care"
                  className="w-full max-w-[600px] px-0 rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="pt-10 bg-[#F4F9FC] w-full min-h-[30vh]">
            <div className="grid md:grid-cols-2 gap-10 items-start px-10 py-6">
              <div>
                <img src={Hospital} alt="hospital" className="rounded-lg" />
              </div>
              <div>
                <h2 className="text-4xl font-semibold text-center text-[#007C9D] mb-4">
                  About HealthCare
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to{" "}
                  <span className="font-semibold text-[#007C9D]">HealthCare</span>,
                  a premier medical institution dedicated to providing world-class
                  healthcare services.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 pt-6 pb-2">
                  Our Mission
                </h3>

                <ul className="list-none space-y-3 text-gray-700">
                  <li className="flex items-center"> Accessible, quality healthcare</li>
                  <li className="flex items-center"> Patient-first approach</li>
                  <li className="flex items-center"> Modern medical technologies</li>
                  <li className="flex items-center"> Ethical & safe care standards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <Blogs />

        <section className="py-12 bg-[#F4F9FC]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-6">
              Our Location
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Visit our facility in Bangalore, accessible from all major areas.
            </p>
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.1806404836!2d77.35073696518088!3d12.95384772031785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9f1b1f3%3A0x4fef6c1c04520e!2sBangalore%2C+Karnataka!5e0!3m2!1sen!2sin!4v1708347492830"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MainContent;
