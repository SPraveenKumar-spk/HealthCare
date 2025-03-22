import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate("/contact");
  };
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-25 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We are committed to providing top-notch healthcare solutions with
            innovative technology and expert care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to empower patients with seamless access to
              healthcare services, enhancing quality and efficiency.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              We envision a world where technology bridges the gap between
              patients and healthcare providers.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Expert Care
              </h3>
              <p className="text-gray-600">
                Our experienced team of medical professionals ensures quality
                care.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Advanced Technology
              </h3>
              <p className="text-gray-600">
                We utilize cutting-edge technology to deliver better healthcare
                outcomes.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                Patient Focused
              </h3>
              <p className="text-gray-600">
                Our focus is always on providing a seamless patient experience.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white text-center py-12 mt-12 rounded-2xl max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Join Us in Transforming Healthcare
          </h2>
          <p className="text-lg mb-6">
            Contact us today to learn more about how we can make a difference
            together.
          </p>
          <button
            onClick={handleGetInTouch}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
