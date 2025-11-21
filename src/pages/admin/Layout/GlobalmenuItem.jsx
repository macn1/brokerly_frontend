import { NavLink, useLocation } from "react-router-dom";
import { MenuItem, SubMenu } from "react-pro-sidebar";

const GlobalMenuItem = ({
  icon,
  label,
  to,
  fun,
  collapsed,
  isSubMenu,
  subMenuItems = [],
  openSubMenu,
  handleSubMenuClick,
  subMenuKey,
}) => {
  const location = useLocation();

  // submenu active detection
  const isChildActive = subMenuItems.some(
    (item) => item.to === location.pathname
  );

  const shouldBeOpen =
    openSubMenu === subMenuKey || (openSubMenu === null && isChildActive);

  // --- SUBMENU ---
  if (isSubMenu) {
    return (
      <SubMenu
        open={shouldBeOpen}
          label={label} 
        icon={icon}
        onClick={() => handleSubMenuClick(subMenuKey)}
      >
        {subMenuItems.map((sub, index) => (
          <NavLink key={index} to={sub.to}>
            <MenuItem icon={sub.icon}>{sub.label}</MenuItem>
          </NavLink>
        ))}
      </SubMenu>
    );
  }

  // --- NORMAL MENU ITEM ---
  if (to) {
    return (
      <NavLink to={to} onClick={fun}>
        <MenuItem icon={icon}>{label}</MenuItem>
      </NavLink>
    );
  }

  // --- CLICK-ONLY ITEM ---
  return (
    <div onClick={fun}>
      <MenuItem icon={icon}>{label}</MenuItem>
    </div>
  );
};

export default GlobalMenuItem;
