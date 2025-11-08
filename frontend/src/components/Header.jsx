import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Logo from "../assets/brand-logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { user, logout } = useAuth();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <header className="bg-white py-4  fixed top-0 left-0 right-0 z-50">
        <nav className="mx-auto flex justify-between items-center w-[90%]">
          <div className="flex">
            <img src={Logo} className="w-12 h-11 cursor-pointer" />
            <a
              className="text-3xl text-[#007C5A] font-semibold cursor-pointer"
              href="#"
            >
              HealthCare
            </a>
          </div>
          <ul className="hidden md:flex gap-8">
            <li>
              <NavLink className="hover:text-gray-500" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-gray-500" to="/services">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-gray-500" to="/about">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="hover:text-gray-500" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

         {user ? (
  <button
    onClick={logout}
    className="hidden md:block px-6 py-3 bg-red-500 text-white rounded hover:bg-red-700"
  >
    Logout
  </button>
) : (
  <NavLink
    to="/login"
    className="hidden md:block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
  >
    Login
  </NavLink>
)}


          {toggle ? (
            <button
              className="md:hidden text-3xl cursor-pointer"
              onClick={handleToggle}
            >
              <RxCross2 />
            </button>
          ) : (
            <button
              className="md:hidden text-3xl cursor-pointer"
              onClick={handleToggle}
            >
              <RxHamburgerMenu />
            </button>
          )}
        </nav>
      </header>

      <div
        className={`fixed top-[4rem] right-0 w-40 h-full z-[100] bg-white shadow-lg transform ${
          toggle ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="mt-12 flex flex-col gap-6 px-6">
          <li>
            <NavLink
              className="hover:text-gray-500"
              to="/"
              onClick={handleToggle}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:text-gray-500"
              to="/services"
              onClick={handleToggle}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:text-gray-500"
              to="/about"
              onClick={handleToggle}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:text-gray-500"
              to="/contact"
              onClick={handleToggle}
            >
              Contact
            </NavLink>
          </li>
          {user ? (
  <li>
    <button
      onClick={() => {
        logout();
        handleToggle();
      }}
      className="text-red-600 hover:text-red-800"
    >
      Logout
    </button>
  </li>
) : (
  <li>
    <NavLink
      className="hover:text-gray-500"
      to="/login"
      onClick={handleToggle}
    >
      Login
    </NavLink>
  </li>
)}

        </ul>
      </div>
    </>
  );
};

export default Header;
