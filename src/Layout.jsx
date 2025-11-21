import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



import { Routes, Route, useLocation } from "react-router-dom";


import Home1 from "./pages/home/Home";
import PrivateRoute from "./Routes/PrivateRoute";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Apartment from "./pages/admin/Apartment/Apartment";
import Apartments from "./pages/Apartments/Apartments";




import Terms from "./pages/TermsAndCondition/Terms";

import Login from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminLayout from "./pages/admin/Layout/AdminLayout";
import Amenities from './pages/admin/Amenities/Amenities'
import OnboardVendor from './pages/admin/OnboardVendor/vendorOnboard'
import Stafflist from './pages/admin/Staff/Staff'
import Contacted from "./pages/admin/contacted/Contacted";
import Facility from './pages/admin/Facility-Services/Facility'
import Extra from './pages/admin/Extrra-service/Exrtra'
import Contacus from './pages/Contact-Us/Contactus'
import VendorLogin from './pages/vendor/Login'
import VendorSignup from './pages/vendor/Signup'
export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasRedirected, setHasRedirected] = useState(false);


  // useEffect(() => {
  //   if (!hasRedirected) {
  //     setHasRedirected(true);
  //     if (location.pathname === "/") {
  //       navigate("/login", { replace: true });
  //     }
  //   }
  // }, [hasRedirected, location.pathname, navigate]);

  const isLayoutHidden =
    location.pathname.startsWith("/admin") || location.pathname === "/login"||  location.pathname === "/vendor-login" ||  location.pathname === "/vendor-register";



  const renderFooter = () => {
    if (
      location.pathname === "/contact-us" ||
      location.pathname === "/terms-and-condition" ||
      location.pathname === "/" ||
      location.pathname === "/apartments"
    ) {
      return <Footer />;
    }

  };



  return (
    <div className="min-h-screen flex flex-col">
      {!isLayoutHidden && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/contact-us" element={<Contacus />} />
          <Route path="/login" element={<Login />} />
            <Route path="/vendor-login" element={<VendorLogin />} />
            <Route path="/vendor-register" element={<VendorSignup />} />


          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="apartment-list" element={<Apartment />} />
              <Route path="staff-list" element={<Stafflist/>} />
              <Route path="apartment-amenities" element={<Amenities />} />
              <Route path="vendor-onboard" element={<OnboardVendor/>} />
              <Route path="contacted-customers" element={<Contacted />} />
              <Route path="apartment-facility" element={<Facility />} />
              <Route path="extra-service" element={<Extra />} />
            </Route>
          </Route>

        </Routes>
      </main>

      {!isLayoutHidden && renderFooter()}
    </div>
  );
}

