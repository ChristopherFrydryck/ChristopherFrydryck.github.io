import { Routes, Route, useLocation } from "react-router-dom"
import './index.css'
import './App.css';
import { AnimatePresence } from "framer-motion";

// Pages
import Home from './assets/pages/home'
import RiivePage from './assets/pages/projects/riive'
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
          <Route path="/" element={ <Home/> } />
          <Route path="/kkQQCkiCxhH5ZcnzUdHR" element={ <RiivePage/> } />
          <Route path="/test" element={ <Test/> } />
          <Route path="test2" element={ <Test2/> } />
          {/* <Route path="about" element={ <About/> } />
          <Route path="contact" element={ <Contact/> } /> */}
        </Routes>
      </AnimatePresence>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p className='syneFont'>
    //     👋  Hey, my name is Christopher. I am a product designer, software engineer, musician & explorer.
    //     </p>
    //     <a
    //       id="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
