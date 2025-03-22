import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../assets/Banner1.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img8 from "../assets/img8.jpg";
import img7 from "../assets/img7.jpg";

import { TbCalendarUser } from "react-icons/tb";
import {
  FaSearch,
  FaLungsVirus,
  FaEye,
  FaBaby,
  FaXRay,
  FaTooth,
} from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { LiaLaptopMedicalSolid } from "react-icons/lia";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { PiHeadCircuitDuotone } from "react-icons/pi";
import { GiKidneys, GiStomach, GiLegArmor } from "react-icons/gi";
import { FaHandsHoldingChild } from "react-icons/fa6";

import Hospital from "../assets/Hospital.jpg";
import SpecialCare from "../assets/SpecialCare.jpg";

import Testimonials from "./Testimonials";

import Blogs from "./Blogs";

function MainContent() {
  const slides = [
    {
      img: img5,
      title: "Stay Healthy, Stay Happy - Let’s Begin Your Care Journey.",
      description:
        " Prioritize your well-being today. Book an appointment and take control of your health.",

      style:
        "w-[50%] text-[#003B5C]  pt-3 md:top-[40%] md:left-[30%] top-[40%] left-[26%]    drop-shadow-lg ",
      action: true,
      buttonData: " Book  Appointment",
      href: "/book-appointment",
    },
    {
      img: img4,
      title: "Expert Doctors, Trusted Care, Exceptional Healing",
      description:
        "Providing world-class healthcare with empathy, cutting-edge technology, and a patient-first approach for a healthier future.",

      style:
        "w-[80%] md:w-[50%] top-[40%] left-[30%] text-gray-900  p-6 drop-shadow-lg",
      action: true,
      buttonData: "Know More",
      href: "/about",
    },
    {
      img: img3,
      title: "Empowering Healthier Lives, One Patient at a Time.",
      description:
        "Prioritize your well-being with expert care and advanced health check-ups designed just for you.",

      style:
        "md:w-[50%] w-[60%] text-[#2D2D2D]   md:top-[35%] md:left-[30%] left-[30%]  drop-shadow-lg",
      action: true,
      buttonData: "Book Health Check-up",
      href: "/health-checkup",
    },

    {
      img: img1,
      title: "Advanced Care, Trusted Pharmacy, Precision Diagnostics.",
      description:
        "Complete healthcare with cutting-edge labs, expert care, and quality medications, all in one place.",
      style: "w-[50%] md:top-[45%] md:left-[72%] left-[70%]",
      action: true,
      buttonData: "Explore Now",
      href: "#explore",
    },
    {
      img: img8,
      title:
        " ~ The good physician treats the disease; the great physician treats the patient who has the disease. ~",
      description: "— Sir William Osler",
      style: "w-[50%] top-[45%] left-[70%] text-[#5A3E2B]",
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
                    <p className="hidden md:block  md:text-2xl  mt-3 text-center ">
                      {slide.description}
                    </p>
                    {slide.action && (
                      <div className="md:pt-10 pt-5 mb-3  md:text-center">
                        <NavLink
                          className="bg-[#F4A259] text-white  text-md  md:text-1xl md:p-4 p-2   md:px-6 md:text-center rounded-lg hover:bg-[rgb(244,143,89)]"
                          to={slide.href}
                        >
                          {slide.buttonData}
                        </NavLink>{" "}
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
            <h2 className="text-3xl text-center py-3 md:py-0 sm:py-6 ">
              How Can We Assist You Today?
            </h2>
            <div className="p-6  flex flex-nowrap ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-13 w-auto cursor-pointer text-center ">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300">
                  <TbCalendarUser
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <NavLink
                    className="text-gray-600 pt-3"
                    to="/book-appointment"
                  >
                    Book Appointment
                  </NavLink>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <CiHospital1
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <NavLink className="text-gray-600 pt-3" to="/find-hospital">
                    Find Hospital
                  </NavLink>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <FaPersonCircleCheck
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <NavLink className="text-gray-600 pt-3" to="/health-checkup">
                    Book Health Check-up
                  </NavLink>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <LiaLaptopMedicalSolid
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <NavLink className="text-gray-600 pt-3" to="/consult-online">
                    Consult Online
                  </NavLink>
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
              At HealthCare, we are committed to providing expert medical
              attention across a wide range of specialized care departments. Our
              team of highly skilled doctors, nurses, and medical professionals
              ensure personalized treatment tailored to each patient's unique
              needs.
            </p>
            <div className="flex flex-wrap justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 p-6 cursor-pointer">
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <MdOutlineMonitorHeart
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Cardiology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <FaLungsVirus
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Pulmonology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <GiKidneys
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Nephrology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <FaHandsHoldingChild
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Pediatrics</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <PiHeadCircuitDuotone
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Neurology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <FaEye size={40} className="mx-auto block text-orange-500" />
                  <h4 className="text-1xl text-center mt-2">Ophthalmology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <FaBaby size={40} className="mx-auto block text-orange-500" />
                  <h4 className="text-1xl text-center mt-2">Neonatology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <FaXRay size={40} className="mx-auto block text-orange-500" />
                  <h4 className="text-1xl text-center mt-2">Radiology</h4>
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <FaTooth
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Dentistry</h4>{" "}
                  {/* Corrected "Radiology" to "Dentistry" */}
                </NavLink>
                <NavLink
                  to="/book-appointment"
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:bg-[#E3F2FD] transition duration-300"
                >
                  <GiLegArmor
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Orthopedic</h4>
                </NavLink>
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
                <img src={Hospital} alt="hospital" className="rounded-lg " />
              </div>
              <div>
                <h2 className="text-4xl font-semibold text-center text-[#007C9D] mb-4">
                  About HealthCare
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to{" "}
                  <span className="font-semibold text-[#007C9D]">
                    HealthCare
                  </span>
                  , a premier medical institution dedicated to providing
                  world-class healthcare services. With a patient-centric
                  approach, state-of-the-art technology, and a team of highly
                  skilled professionals, we are committed to delivering
                  exceptional medical care to individuals and families.
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 pt-6 pb-2">
                  Our Mission
                </h3>
                <p className="text-gray-700 mb-3">
                  At HealthCare, our mission is to:
                </p>

                <ul className="list-none space-y-3">
                  <li className="flex items-center">
                    <span className="material-icons text-[#007C9D] mr-3">
                      check_circle
                    </span>
                    <span>
                      Provide accessible, high-quality healthcare services to
                      all.
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-[#007C9D] mr-3">
                      check_circle
                    </span>
                    <span>
                      Foster a compassionate and patient-first approach to
                      treatment.
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-[#007C9D] mr-3">
                      check_circle
                    </span>
                    <span>
                      Continuously innovate and integrate modern medical
                      technologies.
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="material-icons text-[#007C9D] mr-3">
                      check_circle
                    </span>
                    <span>
                      Uphold the highest standards of medical ethics and patient
                      safety.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          {" "}
          <Testimonials />
        </section>
        <section>
          <Blogs />
        </section>

        <section className="py-12 bg-[#F4F9FC]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-6">
              Our Location
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Visit us at our facility in Bangalore, easily accessible from all
              major areas.
            </p>
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full "
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.1806404836!2d77.35073696518088!3d12.95384772031785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9f1b1f3%3A0x4fef6c1c04520e!2sBangalore%2C+Karnataka!5e0!3m2!1sen!2sin!4v1708347492830"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MainContent;
