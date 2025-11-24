import { useState } from "react";
import Menu from "./Menu";
import logo from "../../assets/stackerbeelogo.png";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-[#181D24] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 md:py-3 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-5">
          <img src={logo} alt="Logo" className="h-12 w-16 md:h-[40px] md:w-[40px]" />
          <span
            className="font-medium text-base md:text-[12px] tracking-[3px] md:tracking-[6px] uppercase text-[#F5F3F1]"
            style={{ fontFamily: "Raleway" }}
          ></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Menu />

          {/* Register as Vendor Button */}
          <Link
            to="/vendor-login"
            className="bg-sky-900 transition px-4 py-2 rounded-lg text-sm font-medium"
          >
            Register as Vendor
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-3xl"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#030303] text-white px-4 py-2 space-y-4">

          <Menu mobile onLinkClick={() => setIsOpen(false)} />

          {/* Mobile Register Button */}
          <Link
            to="/vendor-login"
            onClick={() => setIsOpen(false)}
            className="block w-full bg-sky-900 transition px-4 py-3 rounded-lg text-center font-medium"
          >
            Register as Vendor
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
