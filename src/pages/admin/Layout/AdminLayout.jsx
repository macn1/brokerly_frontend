import { useState, useEffect } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GlobalMenuItem from "./GlobalmenuItem";
import Header from "./Header";
import GetIcon from "../../admin/utils/Icon";
import { removeAuthToken } from "../../../storage/storage";
import { useSelector } from "react-redux";
import logo from '../../../../src/assets/stackerbeelogo.png';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (key) => {
    setOpenSubMenu((prevKey) => (prevKey === key ? null : key));
  };

  useEffect(() => {
    if (user && user.role) {
      setLoading(false);
    }
  }, [user]);

  const allMenuItems = [
    {
      icon: <GetIcon iconName="RiDashboardHorizontalFill" />,
      label: "Dashboard",
      to: "/admin/dashboard",
      roles: ["Admin", "Vendor"],
    },
    {
      icon: <GetIcon iconName="LiaUserClockSolid" />,
      label: "Onboard Vendor",
      to: "/admin/vendor-onboard",
      roles: ["Admin"],
    },
    {
      icon: <GetIcon iconName="FaDoorOpen" />,
      label: "Project List",
      to: "/admin/apartment-list",
      roles: ["Admin", "Vendor"],
    },
    {
      icon: <GetIcon iconName="FaUserTie" />,
      label: "Staff List",
      to: "/admin/staff-list",
      roles: ["Admin", "Vendor"],
    },
    {
      icon: <GetIcon iconName="FaRegCalendarCheck" />,
      label: "Apartment Amenities",
      to: "/admin/apartment-amenities",
      roles: ["User", "Vendor", "Admin"],
    },
    {
      icon: <GetIcon iconName="RiServiceFill" />,
      label: "Apartment Facility Services",
      to: "/admin/apartment-facility",
      roles: ["User", "Vendor"],
    },

    // FIXED — Submenu now has roles
    {
      icon: <GetIcon iconName="FaDoorOpen" />,
      label: "CRM",
      isSubMenu: true,
      roles: ["User", "Vendor", "Admin"],
      subMenuKey: "crm-menu",
      subMenuItems: [
        {
          label: "Enquiry",
          to: "/admin/enq",
          icon: <GetIcon iconName="FaListAlt" />,
        },
        {
          label: "Leads",
          to: "/admin/leads",
          icon: <GetIcon iconName="FaRegCalendarCheck" />,
        },
        {
          label: "Transactions",
          to: "/admin/transactions",
          icon: <GetIcon iconName="RiServiceFill" />,
        },
      ],
    },

    {
      icon: <GetIcon iconName="DiAptana" />,
      label: "Roles & Permissions",
      to: "/admin/roles",
      roles: ["Admin"],
    },
    {
      icon: <GetIcon iconName="MdLogout" />,
      label: "Logout",
      fun: () => {
        removeAuthToken();
        navigate("/");
      },
      roles: ["Admin", "User", "Vendor"],
    },
  ];

  // SAFE FILTERING (no crash if roles missing)
  const filteredMenuItems = allMenuItems.filter(
    (item) => item.roles?.includes(user?.role)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-100">
      {location.pathname !== "/login" && (
        <div className="flex">
          <Sidebar
            collapsed={collapsed}
            className="h-screen shadow-lg transition-all duration-300"
            rootStyles={{ height: "100vh", position: "fixed", zIndex: 40 }}
          >
            <div className="flex flex-col h-full">

              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
              >
                {!collapsed ? (
                  <img src={logo} alt="Logo" className="h-10" />
                ) : (
                  <GetIcon iconName="GiHamburgerMenu" className="text-gray-600" />
                )}
              </div>

              <Menu
                className="flex-grow overflow-y-auto"
                menuItemStyles={{
                  button: {
                    '&:hover': {
                      backgroundColor: 'rgb(12 74 110)',
                      color: 'black',
                    },
                  },
                }}
              >
                {filteredMenuItems.map((item, index) => (
                  <GlobalMenuItem
                    key={index}
                    {...item}
                    collapsed={collapsed}
                    openSubMenu={openSubMenu}
                    handleSubMenuClick={handleSubMenuClick}
                  />
                ))}
              </Menu>
            </div>
          </Sidebar>

          <div
            className="transition-all duration-300"
            style={{ width: collapsed ? "80px" : "250px" }}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
