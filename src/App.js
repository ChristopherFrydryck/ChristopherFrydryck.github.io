import { useEffect } from 'react'
import { Routes, Route, useLocation} from "react-router-dom"
import './index.css'
import './App.css';
import { AnimatePresence } from "framer-motion";

// Pages
import Home from './assets/pages/home'
import Project from './assets/pages/projects/project'
import FourZeroFour from "./assets/pages/404";

// Fonts
import "./assets/fonts/Inter-VariableFont_slnt_wght.ttf"
import "./assets/fonts/Syne-VariableFont_wght.ttf"

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Christopher Frydryck';
  }, []);

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes key={location.pathname} location={location}>
          <Route path="*" element={ <FourZeroFour/> } />
          <Route index path={"/"} element={ <Home/> } />
          <Route path={"/project/:id"} element={ <Project/> } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
