import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GlobalMenuItem from "./GlobalmenuItem";
import Header from "./Header";
import GetIcon from "../../admin/utils/Icon";
import { removeAuthToken } from "../../../storage/storage";
import { useSelector } from "react-redux";
import logo from  '../../../../src/assets/logo.png'
const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const allMenuItems = [
    {
      icon: <GetIcon iconName="RiDashboardHorizontalFill" />,
      label: "Dashboard",
      to: "/admin/dashboard",
    },
    {
      icon: <GetIcon iconName="FaDoorOpen" />,
      label: "Apartment List",
      to: "/admin/apartment-list",
    },
    {
      icon: <GetIcon iconName="FaRegCalendarCheck" />,
      label: "Apartment Amenities",
      to: "/admin/apartment-amenities",
    },
    
    {
      icon: <GetIcon iconName="DiAptana" />,
      label: "Roles & Permissions",
      to: "/admin/roles",
    },
    {
      icon: <GetIcon iconName="MdLogout" />,
      label: "Logout",
      fun: () => {
        removeAuthToken();
        navigate("/");
      },
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-t from-zinc-600 to-stone-500 overflow-hidden">
   
      {location.pathname !== "/login" && (
        <div className="flex">
          <Sidebar 
            collapsed={collapsed}
            className="h-screen shadow-lg transition-all duration-300"
            rootStyles={{
              height: "100vh",
              position: "fixed",
              zIndex: 40,
            }}
          >
            <div className="flex flex-col h-full">
           
              <div 
                className="flex items-center justify-between p-4   cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
              >
                {!collapsed ? (
                  <div className="flex items-center">
                    <img 
                      src={logo} 
                      alt="Logo" 
                      className="h-14"
                    />
                    <span className="ml-2 font-semibold text-lg">Admin Panel</span>
                  </div>
                ) : (
                  <div className="flex justify-center w-full">
                    <GetIcon 
                      iconName="GiHamburgerMenu" 
                      className="text-gray-600 hover:text-gray-800"
                    />
                  </div>
                )}
              </div>
              <Menu className="flex-grow overflow-y-auto">
                {allMenuItems.map((item, index) => (
                  <GlobalMenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    fun={item.fun}
                    userTypeCondition={true}
                    collapsed={collapsed}
                  />
                ))}
              </Menu>
            </div>
          </Sidebar>
          <div 
            className="transition-all duration-300"
            style={{ width: collapsed ? '80px' : '250px' }}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;