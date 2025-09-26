import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import ScrollToTop from "./components/Scorreltop";
import './App.css';

export default function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Layout />
    </Router>
  );
}
