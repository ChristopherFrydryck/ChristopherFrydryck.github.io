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
                    <img src={prevProj.hero} />
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
                    <img src={nextProj.hero} />
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