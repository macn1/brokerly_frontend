import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaBriefcaseMedical,
  FaPassport,
  FaCar,
  FaUtensils,
  FaShoppingBag,
} from "react-icons/fa";
import { TbDental } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MosqueIcon from '@mui/icons-material/Mosque';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { AiOutlineMedicineBox } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { PiMosqueLight } from "react-icons/pi";
import { RiPassportLine } from "react-icons/ri";
import { IoCarSportOutline } from "react-icons/io5";
// import { IoFastFoodOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";

// import Dentistry from '@mui/icons-material/Dentisry';


const links = [
  { name: "Home", path: "/", icon:<BsHouse />
},
  { name: "Apartments", path: "/apartments", icon: <PiBuildingApartmentLight />
},

  { name: "contact us", path: "/contact-us", icon: <SupportAgentIcon /> },
];
const Menu = ({ mobile = false, onLinkClick = () => { } }) => {
  return (
    <nav
      className={`${mobile ? "flex flex-col gap-3" : "flex gap-5"
        } uppercase font-medium`}
    >
      {links.map(({ name, path, icon }) => (
        <NavLink
          key={name}
          to={path}
          onClick={onLinkClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 transition ${isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
            } text-sm md:text-[8px] lg:text-xs tracking-wide`
          }
          style={{ fontFamily: 'rufina' }}
        >
          <span className="text-lg md:hidden lg:inline-flex items-center">{icon}</span>

          <span>{name}</span>
        </NavLink>

      ))}
    </nav>
  );
}
export default Menu;