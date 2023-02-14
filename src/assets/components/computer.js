import React, { useState, useEffect } from 'react'
import styles from '../components/computer.module.css'
import frame from '../images/macbook-white.png'

function Computer(props){

    
    return(
        <div style={props.style} className={`${styles.computer} ${props.className}`}>
                <img src={frame} alt="MacBook Computer Apple" />
                {props.contentType == "video" ? 
                    <video className={styles.videoContent} src={props.content} style={{backgroundPosition: props.contentPosition || '50%'}}autoplay="autoplay" loop="loop" muted></video> 
                :
                    <div className={styles.content} style={{backgroundPosition: props.contentPosition || '50%', backgroundImage: props.content}} />
                }
        </div>
    )
}

export default Computer