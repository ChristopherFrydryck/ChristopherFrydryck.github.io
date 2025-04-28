import React, { useState, useEffect } from 'react'
import styles from '../components/footer.module.css'

function Footer() {
    return(
        <div className={styles.container}>
             {/* <p footer">Copyright {document.write(new Date().getFullYear())} All Rights Reserved.</p> */}
                <span className={styles.inline}>
                    <p>Copyright {new Date().getFullYear()} All Rights Reserved</p>
                    <a href="//www.dmca.com/Protection/Status.aspx?ID=ad98979c-2a7d-4777-8b3e-7bdfe2f017cd" title="DMCA.com Protection Status" class="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca-badge-w100-5x1-08.png?ID=ad98979c-2a7d-4777-8b3e-7bdfe2f017cd"  alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
                </span>
                <p>This website was written by hand with love from Christopher <span className={styles.heart}>❤️</span></p>
                
        </div>
    )
}

export default Footer