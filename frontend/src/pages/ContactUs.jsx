import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen flex items-center justify-center pt-10">
        <div className="bg-white shadow-2xl rounded-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
          <div className="bg-blue-600 text-white p-8 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg mb-6">
              We'd love to hear from you. Fill out the form and our team will
              get back to you shortly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="w-6 h-6" />
                <p>123 HealthCare Street, City, Country</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="w-6 h-6" />
                <p>+1 234 567 890</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="w-6 h-6" />
                <p>support@healthcare.com</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Contact Us
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
