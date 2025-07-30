import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Footer2 from "./components/common/Footer2";
import Footer3 from "./components/common/Footer3";
import Apartment from "./pages/admin/Apartment/Apartment";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments/Apartments";
import Medical from "./pages/Medical";
import Visas from "./pages/Visas";
import Chauffeur from "./pages/Chauffer/Chauffeur";
import FnB from "./pages/FnB";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact-Us/Contact";
import About from "./pages/About-Us/About";
import Terms from "./pages/TermsAndCondition/Terms";
import Bookings from "./pages/Booking/Bookings";
import Login from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminLayout from "./pages/admin/Layout/AdminLayout";
import Amenities from './pages/admin/Amenities/Amenities' 

function Layout() {
  const location = useLocation();

  const isLayoutHidden =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  const renderFooter = () => {
    if (location.pathname === "/contact-us") {
      return <Footer2 />;
    } else if (location.pathname === "/terms-and-condition") {
      return <Footer3 />;
    } else {
      return <Footer />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!isLayoutHidden && <Header />}

      <main className="flex-1">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/visas" element={<Visas />} />
          <Route path="/chauffeur" element={<Chauffeur />} />
          <Route path="/fnb" element={<FnB />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms-and-condition" element={<Terms />} />
          <Route path="/login" element={<Login />} />

          
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="apartment-list" element={<Apartment />} />
            <Route path="apartment-amenities" element={<Amenities />} />


           
          </Route>
        </Routes>
      </main>

      {!isLayoutHidden && renderFooter()}
    </div>
  );
}

export default Layout;
