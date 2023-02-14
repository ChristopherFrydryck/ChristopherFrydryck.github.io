import React, { useState, useEffect } from 'react'
import styles from '../components/navbar.module.css'

import useWindowDimensions from '../functions/getWindowDimensions';

function useNavbar(props) {
    
    // const [activeTab, setActiveTab] = useState(props.active)
    const [underlineWidth, setUnderlineWidth] = useState(140); 
    const [underlineLeft, setUnderlineLeft] = useState('2%'); 
    const [underlineColor, setUnderlineColor] = useState("var(--Gray100)"); 

    const { height, width } = useWindowDimensions();

    useEffect(() => {
        setActiveTabFn(props.active)
    })


    let setActiveTabFn = (tabName) => {
        
        let elementWidth = document.getElementsByClassName(tabName)[0].offsetWidth;
        let index = 0;
        let ul = document.getElementById('nav-ul')

        let pagePadding = window.innerWidth > 1920 ? (window.innerWidth - 1920 - (parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-left').split("px")[0])*2))/2 + parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-left').split("px")[0]) : parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-left').split("px")[0])
        

        // Gets index of LI item selected
        ul.childNodes.forEach((x, i) => {
            if(x.className.split(" ").includes(tabName)){
                index = i;
            }
        })

        
        let elementColor = ["var(--Gray100)", "var(--Purple_Light)", "var(--Pink_Light)", "var(--Light_Blue_Light)", "var(--Green_Light)"]
        
        
        setUnderlineWidth(elementWidth)
        setUnderlineColor(elementColor[index])
        setUnderlineLeft(document.getElementsByClassName(tabName)[0].getBoundingClientRect().x)
   

    }
    

    return (
 
            <div className={styles.tabContainer}>
                <ul id="nav-ul">
                    <li className={props.active == "all" ? `all ${styles.all} ${styles.tab} ${styles.active}` : `all ${styles.all} ${styles.tab}`}><a onClick={props.onPress}>All{ width > 400 ? " Categories" : null}</a></li>
                    <li className={props.active == "pd" ? `pd ${styles.pd} ${styles.tab} ${styles.active}` : `pd ${styles.pd} ${styles.tab}`}><a onClick={props.onPress}>Design</a></li>
                    <li className={props.active == "eng" ? `eng ${styles.eng} ${styles.tab} ${styles.active}` : `eng ${styles.eng} ${styles.tab}`}><a onClick={props.onPress}>Code</a></li>
                    <li className={props.active == "mus" ? `mus ${styles.mus} ${styles.tab} ${styles.active}` : `mus ${styles.mus} ${styles.tab}`}><a onClick={props.onPress}>Music</a></li>
                    <li className={props.active == "exp" ? `exp ${styles.exp} ${styles.tab} ${styles.active}` : `exp ${styles.exp} ${styles.tab}`}><a onClick={props.onPress}>Explore</a></li>
                    <li className={`${styles.about} ${styles.tab}`}><a onClick={props.onPressAbout}>About Me</a></li>
                </ul>
                <div style={{ width: underlineWidth, left: underlineLeft, backgroundColor: underlineColor}} className={styles.underline}></div>
            </div>
        )

}

export default useNavbar