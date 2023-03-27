import '../../App.css'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Test2() {
    return (
      <div
        className="App"
        
      >
    <header className='App-header' style={{paddingTop: '150vh'}}>
       
          <motion.p 
            className='syneFont' 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: .5, delay: 1 }}
            variants={{
              visible: { opacity: 1, y: 0},
              hidden: { opacity: 0, y: 20}
            }}
          >
          👋  Hey, this is my test2 page
          </motion.p>
          <Link
            id="App-link"
            to="/"
          >
            Go to Test 1
          </Link>
        </header>
      </div>
    );
  }
  
  export default Test2;