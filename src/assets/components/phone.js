
import React, { useState, useEffect } from 'react'
import styles from '../components/phone.module.css'
import frame from '../images/apple-iphone-13.png'



function iPhone (props){

    
    return(
        <div style={props.style} className={`${styles.iphone} ${props.className}`}>
                <img src={frame} alt="Apple iPhone 13" />
                {props.contentType == "video" ? 

                    <video className={styles.content} style={{backgroundImage: props.content, backgroundPosition: props.contentPosition || '50% 50%'}}  src={props.content} autoplay="autoplay" loop="loop" muted></video> 
                :
                    <div className={styles.content} style={{backgroundImage: props.content, backgroundPosition: props.contentPosition || '50% 50%'}} />
                }
        </div>
    )
}

export default iPhone