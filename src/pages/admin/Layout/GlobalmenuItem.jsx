import { NavLink, useLocation } from "react-router-dom";
import { MenuItem, SubMenu } from "react-pro-sidebar";

const GlobalMenuItem = ({
  icon,
  label,
  to,
  userTypeCondition = true,
  subMenuItems = [],
  isSubMenu = false,
  openSubMenu,
  handleSubMenuClick,
  subMenuKey,
  design = {},
  activeUrls = [],
  fun
}) => {
  const location = useLocation();
  const isActive2 = activeUrls.includes(location.pathname);

  if (!userTypeCondition) return null;

  return isSubMenu ? (
    <SubMenu
      title={label}
      label={label}
      className="nothover teenfontsize"
      key={subMenuKey}
      open={openSubMenu === subMenuKey}
      onClick={() => handleSubMenuClick(subMenuKey)}
      icon={icon}
    >
      {subMenuItems.map((item, index) => (
        <GlobalMenuItem key={index} {...item} activeUrls={activeUrls} />
      ))}
    </SubMenu>
  ) : to ? (
    <NavLink
      to={to}
      state={{ pageName: label }}
      className={({ isActive }) =>
        isActive || isActive2
          ? "nav bg-zinc-500 block text-white font-medium"
          : "nav block text-default font-medium"
      }
      onClick={fun}
    >
      <MenuItem className="nothover teenfontsize" style={design} icon={icon}>
        {label}
      </MenuItem>
    </NavLink>
  ) : (
    <div
      className="nav block text-default font-medium cursor-pointer"
      onClick={fun}
    >
      <MenuItem className="nothover teenfontsize" style={design} icon={icon}>
        {label}
      </MenuItem>
    </div>
  );
};

export default GlobalMenuItem;
