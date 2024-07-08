import React, { useState, useEffect } from 'react'
import styles from '../components/recommendedProjects.module.css'

function RecommendedProjects(props) {
    const [prevProj, setPrevProj] = useState(props.prevProj)
    const [nextProj, setNextProj] = useState(props.nextProj)

     // Component Did Mount
     useEffect(() => {
       
       
      }, []);

      return(
        <div className={styles.mainContainer}>
            {prevProj ? 
            <div onClick={props.prevProjectClick} className={styles.projCont}>
                <div className={styles.flexHorz}>
                    { prevProj.heroType == "video" ? 
                        <video src={prevProj.hero} style={{backgroundPosition: props.contentPosition || '50% 0%'}} autoPlay="autoPlay" loop="loop" muted playsInline></video> 
                        :
                        <img src={prevProj.hero} />
                    }
                    <span>
                        <p>Previous</p>
                        <h5>{prevProj.name}</h5>
                    </span>
                </div>
            </div>
            : 
            <div />
            }
            {nextProj ? 
            <div onClick={props.nextProjectClick} className={styles.projCont}>
                <div className={styles.flexHorz}>
                    {nextProj.heroType == "video" ? 
                        <video src={nextProj.hero} style={{backgroundPosition: props.contentPosition || '50% 0%'}} autoPlay="autoPlay" loop="loop" muted playsInline></video> 
                    :
                        <img src={nextProj.hero} />
                    }
                    <span>
                        <p>Next</p>
                        <h5>{nextProj.name}</h5>
                    </span>
                </div>
            </div> : <div/> }
        </div>
      )

}

export default RecommendedProjects