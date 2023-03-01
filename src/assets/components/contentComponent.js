import React, { useState, useEffect } from 'react'
import styles from '../components/contentComponent.module.css'
import { motion, useAnimation } from "framer-motion";

import Phone from '../components/phone'
import Computer from './computer';

import useWindowDimensions from '../functions/getWindowDimensions'

function ContentComponent(props){

    const { height, width } = useWindowDimensions();

    return(
        <motion.div initial={{ opacity: 0}} whileInView={{ opacity: 1 }} transition={{ duration: .5, delay: .5 }} viewport={{ once: true }} className={styles.content} style={props.reversed? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}}>
            <div className={styles.left}>
                <h4 className={styles.number}>{props.number ? props.number.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) : null}</h4>
                <h2 className={styles.title}>{props.title || null}</h2>
                <p className={styles.bio} style={{whiteSpace: 'pre-line', lineBreak: 'loose'}}>{props.description || null}</p>
            </div>
            {props.contentType === 'phone' ?
            <div className={styles.right}>
                <div className={styles.heroContainer}>
                    
                        <motion.div initial={props.reversed ? { opacity: 0, x: -48 } : { opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .5 }} viewport={{ once: true }} style={ props.reversed ? {opacity: 0, x: -48} : {opacity: 0, x: 48}}>
                            <Phone contentType={props.contentMediaType} content={props.contentMedia} contentPosition={props.contentPosition || '50% 0%'} className={styles.phone}/>
                        </motion.div>
                       
                    <div className={styles.herobg} style={props.reversed? {left: 0} : {right: 0}} />
                </div>
            </div>
             : props.contentType == 'computer' ?
             <div className={styles.right}>
                <div className={styles.heroContainerComputer}>
                       
              
                        <motion.div initial={props.reversed ? { opacity: 0, x: -48 } : { opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .5 }} viewport={{ once: true }} style={props.reversed ? {opacity: 0, x: -48, y: '40%', width: '100%', height: '100%'} : {opacity: 0, x: 48, y: '40%', width: '100%', height: '100%'}}>
                            <Computer contentType={props.contentMediaType} content={props.contentMedia} contentPosition={props.contentPosition || '50% 0%'} className={styles.computer} />
                        </motion.div>
                       
                    <div className={styles.herobg} style={props.reversed? {left: 32} : {right: 32}} />
                </div>
            </div>
            : props.contentType == 'image' ? 
            <div className={styles.right}>
                <div className={styles.heroContainerComputer}>
                       
                        
                           <motion.img initial={props.reversed ? { opacity: 0, x: -48, y: 24 } : { opacity: 0, x: 48, y: 24 }} whileInView={{ opacity: 1, x: 0, y: 24 }} transition={{ duration: .5, delay: .5 }} viewport={{ once: true }} style={props.reversed ? {opacity: 0, x: -48, y: 24 } : {opacity: 0, x: 48, y: 24}} className={styles.image} src={props.contentMedia} />
             

    
                    <div className={styles.herobg} style={props.reversed? {left: 48} : {right: 48}} />
                </div>
            </div>
            : 
            width > 768 ? 
                <div className={styles.right}>
                    <div className={styles.heroContainerComputer}>
                        <div className={styles.herobg} style={props.reversed? {left: 48} : {right: 48}} />
                    </div>
                </div>  
            : null 
            }
        </motion.div>
    )
}

export default ContentComponent