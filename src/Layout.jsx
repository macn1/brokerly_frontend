import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



import { Routes, Route, useLocation } from "react-router-dom";

import City from './pages/cultural-city/CulturalCity'
import Home1 from "./pages/home/Home";
import PrivateRoute from "./Routes/PrivateRoute";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Footer2 from "./components/common/Footer2";
import Footer3 from "./components/common/Footer3";
import Footer4 from './components/common/Footer4'
import Footer5 from './components/common/Footer5'
import Apartment from "./pages/admin/Apartment/Apartment";
import Apartments from "./pages/Apartments/Apartments";
import Medical from "./pages/medical/Medical";
import Visas from "./pages/Visas";
import Chauffeur from "./pages/Chauffer/Chauffeur";
import FnB from "./pages/FnB";
import Shop from "./pages/Shop";
import About from "./pages/About-Us/About";
import Terms from "./pages/TermsAndCondition/Terms";
import Bookings from "./pages/Booking/Bookings";
import Login from "./pages/admin/Login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AdminLayout from "./pages/admin/Layout/AdminLayout";
import Amenities from './pages/admin/Amenities/Amenities'
import Contacted from "./pages/admin/contacted/Contacted";
import Facility from './pages/admin/Facility-Services/Facility'
import Extra from './pages/admin/Extrra-service/Exrtra'
import Contacus from './pages/Contact-Us/Contactus'
import lets from "./assets/lets_connect_landscape.png";
import footer from "./assets/footer.jpg";
import foot from './assets/foot.jpg'
import book from './assets/book.jpg'

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
    location.pathname.startsWith("/admin") || location.pathname === "/login";


    
const renderFooter = () => {
  if  (
    location.pathname === "/contact-us" ||
    location.pathname === "/terms-and-condition"
  ){
    return <Footer2 />;
  }

  let footerImage = footer;

  if (location.pathname === "/apartments") {
    footerImage = lets;
  } else if (location.pathname === "/apartments") {
    footerImage = lets;
  } else if (location.pathname === "/cultural-city") {
    footerImage = foot;
  }else if (location.pathname === "/booking") {
    footerImage = book;
  }

  return <Footer4 image={footerImage} />;
};

  // const renderFooter = () => {
  //   if (location.pathname === "/contact-us") {
  //     return <Footer2 />;
  //   } else if (location.pathname === "/terms-and-condition") {
  //     return <Footer3 />;
  //   }else if (location.pathname === "/apartments") {
  //     return <Footer3 />;
  //   }
  //   else if (location.pathname === "/cultural-city") {
  //     return <Footer4 />;
  //   }
  //   else {
  //     return <Footer />;
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col">
      {!isLayoutHidden && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home1 />} />
          {/* <Route path="/home" element={<Home1 />} /> */}


          <Route path="/apartments" element={<Apartments />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/visas" element={<Visas />} />
          <Route path="/cultural-city" element={<City />} />
          <Route path="/chauffeur" element={<Chauffeur />} />
          <Route path="/fnb" element={<FnB />} />
          <Route path="/shop" element={<Shop />} />
          {/* <Route path="/contact-us" element={<Contact />} /> */}
          <Route path="/contact-us" element={<Contacus />} />

          <Route path="/about-us" element={<About />} />
          <Route path="/terms-and-condition" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="apartment-list" element={<Apartment />} />
              <Route path="apartment-amenities" element={<Amenities />} />
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

