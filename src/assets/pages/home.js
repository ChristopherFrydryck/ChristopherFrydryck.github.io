import '../../App.css'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

import styles from '../pages/home.module.css'

// Components
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar'
import ProjectCard from '../components/project-card';
import Footer from '../components/footer'

// Data
import projects from '../constants/projects';

// Functions
import useWindowDimensions from '../functions/getWindowDimensions';


function Home() {
    const [homeActiveTab, setHomeActiveTab] = useState('all')
    const [sidebarVisible, showSidebar] = useState(false);
    const [projectsVisible, showProjects] = useState(false);


    const { height, width } = useWindowDimensions();



    useEffect(() => {
        if(sidebarVisible){
            // Disables Background Scrolling whilst the SideDrawer/Modal is open
                document.body.classList.add("stop-scroll")
                // document.body.style.overflow = 'hidden';
                // document.body.style.height = '100%';
        }else{
            document.body.classList.remove("stop-scroll")
            // document.body.style.overflow = 'unset';
            // document.body.style.height = 'auto';
        }

        
    }, [sidebarVisible])

    useEffect(() => {
        showProjects(false)
        setTimeout(() => {
            showProjects(true)
          }, 250)
    }, [homeActiveTab])

    const myProjects = (filter) => {
        let numResults = 0;
        return projects.map((x, i) => {
            if(x.type.includes(filter) || filter == 'all'){
                if(x.visible){
                    numResults++;
                    return(    
                        <ProjectCard
                            key={numResults}
                            title={x.name} 
                            subtitle={x.about} 
                            destination={`/project/${x.hash}`}
                            type={x.type}
                            colorFirst={x.reversed}
                            locked={x.password_protected}

                            devices={x.devices} 

                            phoneContent={x.phoneContentType == 'image' ? `url("${x.phoneContent}")` : x.phoneContent}
                            phoneContentType={x.phoneContentType}
                            phoneContentPosition="0% 0%"

                            computerContent={x.computerContentType == 'image' ? `url("${x.computerContent}")` : x.computerContent}
                            computerContentType={x.computerContentType}
                            computerContentPostion={null}
                            
                            sideImg={x.heroVisible ? x.heroType == 'image' ? `url("${x.hero}")` : x.hero : null} 
                            heroType={x.heroType} 

                            delay={numResults * .1}
                        />
                    )
                }else{
                    return null
                }
            }else{
                return null
            }
         }).filter(x => x !== null)}

        
    


    return (
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5 }} className={styles.flexContainerVert}>
            <Sidebar 
                closeHandler={() => showSidebar(false)} 
                visible={sidebarVisible} 
                width={width > 480 ? width * .5 : width * .85}
                maxWidth={325}
            />
            
            <AnimatePresence>
            <div className={styles.intro}>
                <h1>👋 Hey, my name is Christopher. I am a <motion.a onClick={() => setHomeActiveTab("pd")} className={styles.productDesignerLink} initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ duration: .5, delay: .1 }}>product designer</motion.a>, <motion.a onClick={() => setHomeActiveTab("eng")} className={styles.softwareEngineerLink} initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .25 }}>software engineer</motion.a>, <motion.a onClick={() => setHomeActiveTab("mus")} href="#" className={styles.musicianLink} initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .45 }}>musician</motion.a> & <motion.a onClick={() => setHomeActiveTab("exp")} href="#" className={styles.explorerLink} initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .65 }}>explorer</motion.a>.</h1>
            </div>
            </AnimatePresence>

            <Navbar 
                onPress={(res) => setHomeActiveTab(res.target.parentElement.className.split(" ")[0])} 
                onPressAbout={() => showSidebar(true)}
                active={homeActiveTab}
            />

            <div className={styles.container}>
                

            {/* <Computer /> */}
            {/* <Phone content="url(https://picsum.photos/200/300)" contentPosition="50% 50%"/>

            <Phone contentType="video" content="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4"/> */}

            {/* <Link to="/test">Hello</Link>
            <h2>Hello {homeActiveTab} ♥️</h2> */}
            {projectsVisible  &&  myProjects(homeActiveTab).length > 0 ? 


            <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .2 }}  className={styles.projectList}>
                { myProjects(homeActiveTab) }
                
            </motion.div> 
            
            
            
            
            : <div style={{height: '40vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {myProjects(homeActiveTab).length == 0 ? <p style={{color: 'var(--Gray600)'}}>Coming Soon...</p> : null}
            </div>
            
            

            

            }
            </div>
            <div onClick={() => showSidebar(true)} className={styles.aboutBubble}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#ECECEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#ECECEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#ECECEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <Footer />
        </motion.div>
        
    )
}

export default Home;