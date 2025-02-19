import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../assets/Banner1.jpg";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";

function ImageCarousel() {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    // "https://img.freepik.com/free-photo/stethoscope-rests-beside-symbolic-red-heart_60438-3566.jpg?t=st=1739972940~exp=1739976540~hmac=04190957942af5ba4b85fb1b26900f4dbc00aa5db3c987167554ed14566cbbbd&w=1380",
    // "https://img.freepik.com/free-photo/image-woman-doctor-listening-patient-lungs-with-stethoscope-doing-medical-checkup-clinic-stand_1258-127175.jpg?t=st=1739973027~exp=1739976627~hmac=0daac8014499f1df60eeff21e454b15e0a3c64083c7f88fe5b056bc92499ddb5&w=1380",
    // "https://img.freepik.com/free-photo/medium-shot-doctors-wearing-protective-equipment_23-2149994405.jpg?t=st=1739973202~exp=1739976802~hmac=e615b705a0c1a28e0aa27ba1f03a7a721b649966a92760467fdb3d2a87b6fc75&w=1380",
    // "https://img.freepik.com/free-photo/portrait-smiling-medical-worker-girl-doctor-white-coat-with-stethoscope-pointing-fingers-left_1258-124585.jpg?t=st=1739973285~exp=1739976885~hmac=d9d292a398f2484e9493b9fe7cf1fd8d008c44819200baa049f299c14e6c8d73&w=1380",
    // "https://img.freepik.com/free-vector/healthcare-medical-banner-template-background_1035-16583.jpg?t=st=1739973337~exp=1739976937~hmac=b33513c3a26e623d231fb43170e01a725cf60d225948d9b60b47d184c0c84634&w=1380",
    // "https://img.freepik.com/free-vector/medical-shield-protection-with-cardiograph-heartbeat-lines_1017-36969.jpg?t=st=1739973406~exp=1739977006~hmac=8e4058179c21b6b9599a1f44770b84cf96bead79c22a6a34cf8120ef9b7dfae2&w=1380",
  ];

  return (
    <div className="w-full mx-auto mt-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[550px] object-cover "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageCarousel;
