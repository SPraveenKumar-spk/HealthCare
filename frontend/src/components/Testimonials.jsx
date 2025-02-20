import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import patient1 from "../assets/patient1.jpg";
import patient2 from "../assets/patient2.jpg";
import patient3 from "../assets/patient3.avif";
import patient4 from "../assets/patient4.jpg";
import patient5 from "../assets/patient5.jpg";
import patient6 from "../assets/patient6.jpg";
import patient7 from "../assets/patient7.avif";
import patient8 from "../assets/patient8.jpg";

const testimonials = [
  {
    name: "John Doe",
    image: patient1,
    review:
      "HealthCare transformed my life! The doctors were outstanding, and the care I received was exceptional.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    image: patient2,
    review:
      "The staff made me feel comfortable throughout my surgery. I highly recommend HealthCare for any medical needs!",
    rating: 4.5,
  },
  {
    name: "Sarah Williams",
    image: patient3,
    review:
      "After my knee replacement, I can walk pain-free. Truly life-changing care! The team was very supportive throughout my recovery process.",
    rating: 5,
  },
  {
    name: "David Miller",
    image: patient4,
    review:
      "My heart surgery was a success thanks to the expert team at HealthCare! They provided amazing post-surgery care as well.",
    rating: 4.8,
  },
  {
    name: "Emily Johnson",
    image: patient5,
    review:
      "Excellent service! The doctors and nurses took great care of me during my treatment. I always felt in safe hands.",
    rating: 5,
  },
  {
    name: "James Anderson",
    image: patient6,
    review:
      "HealthCare provides top-notch medical services. My experience was wonderful, and I recommend them highly!",
    rating: 4.7,
  },
  {
    name: "Sophia Martinez",
    image: patient7,
    review:
      "The orthopedic department helped me recover quickly. I’m forever grateful for their excellent care and support.",
    rating: 5,
  },
  {
    name: "Daniel Wilson",
    image: patient8,
    review:
      "From consultation to recovery, everything was handled professionally and with care. They truly prioritize patient well-being.",
    rating: 4.9,
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-[#E8F3F8]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#0A3D62] mb-6">
          Patient Testimonials & Success Stories
        </h2>
        <p className="text-gray-700 text-center text-lg mb-10 px-5">
          Hear from our patients about their journey to better health.
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {testimonials.map((patient, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-[330px] hover:scale-105 hover:shadow-xl transition duration-300">
                <img
                  src={patient.image}
                  alt={patient.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#007C9D]"
                />
                <h3 className="text-xl font-semibold">{patient.name}</h3>
                <p className=" pt-2 text-gray-600 flex-grow overflow-hidden">
                  {patient.review}
                </p>

                <div className="text-yellow-500 flex justify-center gap-1 pt-4">
                  {Array.from(
                    { length: Math.floor(patient.rating) },
                    (_, i) => (
                      <FaStar key={i} size={20} />
                    )
                  )}
                  {patient.rating % 1 !== 0 && <FaStarHalfAlt size={20} />}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
