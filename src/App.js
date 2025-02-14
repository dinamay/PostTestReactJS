import About from "./pages/About";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Pendaftaran from "./pages/Pendaftaran";
import "./assets/styles/navbar.css";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';


function App() {
  return (
    <BrowserRouter>
      <header className="nav-header">
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pendaftaran">Register</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/pendaftaran" element={<Pendaftaran />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
