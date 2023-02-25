import { Routes, Route, useLocation } from "react-router-dom"
import './index.css'
import './App.css';
import { AnimatePresence } from "framer-motion";

// Pages
import Home from './assets/pages/home'
import Project from './assets/pages/projects/project'
import Test from './assets/pages/test';
import Test2 from './assets/pages/test2'

// Fonts
import "./assets/fonts/Inter-VariableFont_slnt_wght.ttf"
import "./assets/fonts/Syne-VariableFont_wght.ttf"

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes key={location.pathname} location={location}>
          <Route index path={"/"} element={ <Home/> } />
          <Route path={"/project"} element={ <Project/> } />
          <Route path={"/test"} element={ <Test/> } />
          <Route path={"test2"} element={ <Test2/> } />
          {/* <Route path="about" element={ <About/> } />
          <Route path="contact" element={ <Contact/> } /> */}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
