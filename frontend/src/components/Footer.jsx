import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Footer() {
  return (
    <footer className="mt-auto mb-0 bg-black text-white py-10 px-6 md:px-16">
      <div className="container mx-auto grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">HealthCare</h1>
          <p className="text-gray-300">
            Providing the best healthcare solutions with top professionals.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/services" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-400">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <div className="flex gap-2">
            <HiOutlineMail size={20} />
            <p className="text-gray-300 text-">support@healthcare.com</p>
          </div>
          <div className="flex gap-3">
            <FaPhoneAlt size={20} />
            <p className="text-gray-300">+91 1234567891</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Subscribe to receive the latest updates and offers.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent border border-gray-400 rounded px-4 py-2 text-white focus:outline-none"
            />
            <button className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-8 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} HealthCare. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
