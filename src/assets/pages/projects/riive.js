import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

import styles from '../projects/project.module.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'


import Footer from '../../components/footer'

// Data
import projects from '../../constants/projects';

// Functions
import useWindowDimensions from '../../functions/getWindowDimensions';

function Project(){
    const [projectData, setProjectData] = useState(null)
    const [loadingPage, loadingPageStatus] = useState(true)

    const location = useLocation()
    const { projectID, locked } = location.state
    const db = firebase.firestore();

    const getProject = (pid) => {
        db.collection('projects').doc(pid).get().then(res => {
            console.log(res.data())
        })
    }

    // Component Did Mount
    // useEffect(async() => {
    //     // loadingPageStatus(true)
    //     getProject(projectID);
      
          
        
    //   }, []);

      
    if(loadingPage){
      return(
        <div className={styles.loadingContainer}>
            <header>
            <Link
            id="App-link"
            to="/"
          >
            Go to Test 2
          </Link>
            </header>
            <h1>Loading</h1>
            
        <div className={styles.shimmerContainer} style={{width: '40%'}}>
            {/* <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div> */}
            <div className={styles.shimmer}></div>
        </div>

        </div>
      )
    }else{
        if(locked){
            return(
                <div>
                    <h1>LOCKED</h1>
                </div>
              )
        }else{
            return(
                <div>
                    <h1>PAGE</h1>
                </div>
              )
        }
    }
    
}

export default Project