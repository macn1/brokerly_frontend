import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Footer2 from './components/common/Footer2'; 
import Home from "./pages/Home";
import Apartments from './pages/Apartments/Apartments'
import Medical from "./pages/Medical";
import Visas from "./pages/Visas";
import Chauffeur from "./pages/Chauffer/Chauffeur";
import FnB from "./pages/FnB";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact-Us/Contact";
import About from "./pages/About-Us/About";


function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/visas" element={<Visas />} />
          <Route path="/chauffeur" element={<Chauffeur />} />
          <Route path="/fnb" element={<FnB />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </main>
      {location.pathname === "/contact-us" ? <Footer2 /> : <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
