// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import Medical from "./pages/Medical";
import Visas from "./pages/Visas";
import Chauffeur from "./pages/Chauffeur";
import FnB from "./pages/FnB";
import Shop from "./pages/Shop";

export default function App() {
  return (
    <Router>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}