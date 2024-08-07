import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, calcLength } from 'framer-motion'
import styles from '../components/project-card.module.css'
import { Link } from 'react-router-dom'
import Computer from './computer';
import Phone from './phone'

// import { DeviceFrameset } from 'react-device-frameset'
// import 'react-device-frameset/dist/styles/marvel-devices.min.css'


function ProjectCard(props) {
    const color = props.type[0] === 'pd' ? 'var(--Purple_Medium)' : props.type[0] === 'eng' ? 'var(--Pink_Medium)' : props.type[0] === 'mus' ? 'var(--Light_Blue_Medium)' :  props.type[0] === 'exp' ? 'var(--Green_Light)' : 'white';

    let hasPhone =  props.devices.includes("phone");
    let hasComp =  props.devices.includes("computer");

        
    const phoneStyle = hasComp ? {
        position: 'absolute' ,
        width: "15%", 
        // top: '33%',
        marginTop: '-25%',
        right: '10%',
    } :
    {
        position: 'relative' ,
        marginTop: props.sideImg ? '50%' : '35%',
        // height: '20%',
        width: props.sideImg ? '80%' : '60%',
        minWidth: 200,
        // padding: '0 20%',
    }

    
    return(
        <AnimatePresence>
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5, delay: props.delay || 0 }} style={{opacity: 0}} >
        <Link state={props.state} className={styles.link} to={props.destination} style={{textDecoration: 'none'}}>
            <div className={styles.card}>

            {props.locked ? 
                        <div style={props.colorFirst ? {right: '8px'} : {left: '8px'}} className={styles.lockedCont}>
                            <p>Password Protected</p>
                        </div>
                    : null}


                <div style={props.colorFirst ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}} className={styles.header}>

                    {hasComp || hasPhone ? 
                    <div style={{backgroundColor: color}} className={styles.left}>

                    
                        <div className={styles.content}>
                        
                        {
                        hasComp ? <Computer 
                            content={props.computerContent}
                            contentType={props.computerContentType}  
                            contentPosition={props.computerContentPosition || null}
                            className={props.sideImg ? `${styles.computer} ${styles.computerOnly}`: styles.computer} />
                            : null
                        }


                        { hasPhone && !hasComp ?

                        <div style={{width: '100%', marginTop: '0%', display: 'flex', justifyContent: 'center'}}>
                            <Phone 
                                style={phoneStyle} 
                                content={props.phoneContent} 
                                contentType={props.phoneContentType} 
                                contentPosition={props.phoneContentPosition}/>
                        </div>
                        
                        : hasPhone ? 
                            <Phone 
                                style={phoneStyle} 
                                content={props.phoneContent} 
                                contentType={props.phoneContentType} 
                                contentPosition={props.phoneContentPosition}/>
                        : null}
                        </div>
                            
                        </div>
                    : null}

                    {props.sideImg ?
                        props.heroType == 'image' ?
                            <div className={styles.right}>
                                <div style={{backgroundSize: 'cover', backgroundColor: color, backgroundImage: props.sideImg, width: '100%', height: '100%', backgroundPosition: '50% 50%'}}></div>
                            </div>
                            :
                            <div className={styles.right}>
                                {/* <div style={{backgroundSize: 'cover', backgroundColor: color, backgroundImage: props.sideImg, width: '100%', height: '100%', backgroundPosition: '50% 50%'}}></div> */}
                                <video src={props.sideImg}  style={{objectFit: 'cover', width: '100%', height: '100%', backgroundPosition: '50% 50%'}} autoPlay="autoPlay" loop="loop" muted playsInline></video>
                            </div>
                    : null}
                </div>
            
                {/* <div style={{display: 'flex', flexDirection: 'row',}} className={props.colorFirst ? styles.image : styles.imageReversed}> */}


                
                {/* <div style={ !props.colorFirst  && (hasPhone || hasComp) ? {position: 'absolute', backgroundColor: 'orange', overflow: 'hidden', height: '100%', width:'20%', left: 0} : props.colorFirst  && (hasPhone || hasComp) ? {position: 'absolute', backgroundColor: 'orange', overflow: 'hidden', height: '100%', width:'20%', right: 0} : null } /> */}
               
                    
                   {/* {!hasComp && !hasPhone ?
                   <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: color, opacity: .3}}></div>
                    : null} */}
                    
                    
                    
                    
                {/* </div> */}
                
                <div className={styles.container}>
                    <p className={styles.title}>{props.title}</p>
                    <p className={styles.subtitle}>{props.subtitle}</p>
                </div>
            </div>
            
        </Link>
        </motion.div>
        </AnimatePresence>
    )
}

export default ProjectCard