import styles from './404.module.css'

import image from '../images/TravoltaLost.webp'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FourZeroFour() {
    return(
        <div className={styles.container}>
            <span className={styles.textCont}>
                <h1>Uh Oh!</h1>
                <h3>I think you are lost...</h3>
                <p>Check that the URL you provided is valid or return home.</p>
                <Link to="/" id={styles.toHomeBtn}>Return to Home</Link>
            </span>
            
            <img src={image} />
        </div>
        
    )  
}

export default FourZeroFour