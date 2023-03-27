import '../../App.css'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Test() {
    return (

      <motion.div
      className="App"
      initial={{ width: 0, opacity: 0}}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: .5 }}
    >
        <motion.header 
          className="App-header"
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .5, delay: .3 }}
        >
       
          <p className='syneFont'>
          👋  Hey, this is my test page
          </p>
          <Link
            id="App-link"
            to="/"
          >
            Go to Test 2
          </Link>
        </motion.header>
      </motion.div>
    );
  }
  
  export default Test;