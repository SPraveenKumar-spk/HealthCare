import { TbCalendarUser } from "react-icons/tb";
import { FaSearch, FaLungsVirus, FaEye, FaBaby, FaXRay } from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { LiaLaptopMedicalSolid } from "react-icons/lia";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { PiHeadCircuitDuotone } from "react-icons/pi";
import { GiKidneys, GiStomach } from "react-icons/gi";
import { FaHandsHoldingChild } from "react-icons/fa6";

import Hospital from "../assets/Hospital.jpg";
import SpecialCare from "../assets/SpecialCare.jpg";

import Testimonials from "./Testimonials";

import ImageCarousel from "./ImageCarousel";
import Blogs from "./Blogs";
function MainContent() {
  return (
    <>
      <div>
        <section>
          {" "}
          <ImageCarousel />
        </section>

        {/* bg-[#007C9D] */}
        <section>
          <div className="flex flex-col justify-center items-center bg-white w-full min-h-[50vh] text-gray-800">
            <h2 className="text-3xl ">How Can We Assist You Today?</h2>
            <div className="p-6  flex flex-nowrap ">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-13 w-auto cursor-pointer text-center ">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300">
                  <TbCalendarUser
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <p className="text-gray-600 pt-3">Book Appointment</p>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <FaSearch className="text-gray-600 mx-auto block" size={40} />
                  <p className="text-gray-600 pt-3">Find Doctor</p>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <CiHospital1
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <p className="text-gray-600 pt-3">Find Hospital</p>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <FaPersonCircleCheck
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <p className="text-gray-600 pt-3">Book Health Check-up</p>
                </div>

                <div className="bg-white  p-6 rounded-2xl shadow-md hover:bg-[#E3F2FD] hover:shadow-xl transition duration-300 ">
                  <LiaLaptopMedicalSolid
                    className="text-gray-600 mx-auto block"
                    size={40}
                  />
                  <p className="text-gray-600 pt-3">Consult Online</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="mt-2 w-full min-h-50vh">
            <h3 className="text-3xl text-center pt-5">
              Explore Our Specialized Care Departments
            </h3>
            <p className="text-gray-700 pt-4 px-10 text-center ">
              At HealthCare, we are committed to providing expert medical
              attention across a wide range of specialized care departments. Our
              team of highly skilled doctors, nurses, and medical professionals
              ensure personalized treatment tailored to each patient's unique
              needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-15 px-10 py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10  p-6 cursor-pointer">
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <MdOutlineMonitorHeart
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Cardiology</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <FaLungsVirus
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Pulmonology</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <GiKidneys
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Nephrology</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <FaHandsHoldingChild
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Pediatrics</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <PiHeadCircuitDuotone
                    size={40}
                    className="mx-auto block text-orange-500"
                  />
                  <h4 className="text-1xl text-center mt-2">Neurology</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md ">
                  <GiStomach
                    size={40}
                    className="mx-auto block text-orange-500"
                  />

                  <h4 className="text-1xl text-center  mt-2">
                    Gastroenterology
                  </h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <FaEye size={40} className="mx-auto block text-orange-500" />
                  <h4 className="text-1xl text-center mt-2">Ophthalmology</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <FaBaby size={40} className="mx-auto block text-orange-500" />
                  <h4 className="text-1xl text-center mt-2">Neonatology</h4>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <FaXRay size={40} className="mx-auto block text-orange-500" />
                  <h4 className="text-1xl text-center mt-2">Radiology</h4>
                </div>
              </div>
              <div>
                <img
                  src={SpecialCare}
                  alt="special care"
                  className="rounded-lg "
                ></img>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="pt-10 bg-[#F4F9FC] w-full min-h-[50vh]">
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
                className="w-full h-full"
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
