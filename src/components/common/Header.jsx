import { useState } from "react";
import Menu from "./Menu";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-[#03030380] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AJP Logo" className="h-10 w-10 md:h-[60px] md:w-[60px]" />
          <span className="font-medium text-base md:text-[12px] tracking-[3px] md:tracking-[6px] uppercase text-[#F5F3F1]" style={{ fontFamily: 'Raleway' }}>
            AJP GROUP
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Menu />
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-3xl"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#030303] text-white px-4 py-2">
          <Menu mobile onLinkClick={() => setIsOpen(false)} />
        </div>
      )}
    </header>

  );
}
export default Header;