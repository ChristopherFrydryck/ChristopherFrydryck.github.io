import React, { useState, useEffect } from 'react'
import styles from '../components/footer.module.css'

function Footer() {
    return(
        <div className={styles.container}>
             {/* <p footer">Copyright {document.write(new Date().getFullYear())} All Rights Reserved.</p> */}
                <p>Copyright {new Date().getFullYear()} All Rights Reserved</p>
                <p>This website was written by hand with love from Christopher <span className={styles.heart}>❤️</span></p>
  
        </div>
    )
}

export default Footer