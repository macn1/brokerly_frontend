import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaBriefcaseMedical,
  FaPassport,
  FaCar,
  FaUtensils,
  FaShoppingBag,
} from "react-icons/fa";

const links = [
  { name: "Apartments", path: "/apartments", icon: <FaBuilding /> },
  { name: "Medical", path: "/medical", icon: <FaBriefcaseMedical /> },
  { name: "Visas", path: "/visas", icon: <FaPassport /> },
  { name: "Chauffeur", path: "/chauffeur", icon: <FaCar /> },
  { name: "F&B", path: "/fnb", icon: <FaUtensils /> },
  { name: "Shop", path: "/shop", icon: <FaShoppingBag /> },
];
const Menu = ({ mobile = false }) => {
  return (
    <nav
      className={`${
        mobile ? "flex flex-col gap-3" : "flex gap-5"
      } uppercase font-medium`}
    >
      {links.map(({ name, path, icon }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 transition ${
              isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
            } text-[16px] md:text-[12px] tracking-wide`
          }
         style={{fontFamily: 'rufina'}}>
          <span className="text-base">{icon}</span>
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
export default Menu;