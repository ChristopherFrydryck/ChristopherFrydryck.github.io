import { React, useEffect, useRef, useState  } from 'react';
import { motion, useScroll, useAnimation, filterProps } from "framer-motion";
import { Link, resolvePath, useLocation } from 'react-router-dom';

import Phone from '../../components/phone';
import Computer from '../../components/computer';
import ContentComponent from '../../components/contentComponent';

import styles from '../projects/project.module.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'


import Footer from '../../components/footer'

// Data
import projects from '../../constants/projects';

// Functions
import useWindowDimensions from '../../functions/getWindowDimensions';
import { getRoles } from '@testing-library/react';

function Project(){
    const [loadingPage, loadingPageStatus] = useState(false)
    const [projectData, setProjectData] = useState(null)
    
    /* Hook for scroll y */
    const { scrollYProgress } = useScroll();
    /* State for progress */
    const [yProgress, setYProgress] = useState(0);

    const { height, width } = useWindowDimensions();
    const containerRef = useRef()
    const imageRef = useRef();

    

    

    const location = useLocation()
    const { projectID, locked, type, heroType} = location.state
    const color = type[0] === 'pd' ? 'var(--Purple_Medium)' : type[0] === 'eng' ? 'var(--Pink_Medium)' : type[0] === 'mus' ? 'var(--Light_Blue_Medium)' :  type[0] === 'exp' ? 'var(--Green_Light)' : 'white';

    const db = firebase.firestore();

    const getProject = (pid) => {
        loadingPageStatus(true)
        db.collection('projects').doc(pid).get().then(res => {
            return res.data()
        }).then((data) => {
            setProjectData(data)  
            console.log(data)     
        }).then(() => {
            setTimeout(() => {
                loadingPageStatus(false)
            }, 1000)
        })
    }

    /* trigger when scroll is updated */
    useEffect(() => {
        return scrollYProgress.onChange(p => setYProgress(p));
    }, [scrollYProgress]);


    // getRoles(() => {
    //     if(projectData){
    //         projectData.roles.map((x, i) => {
    //             if(i == projectData.roles.length){
    //                 return(x)
    //             }else{
    //                 return(`${x}, `)
    //             }
    //         })
    //     }
    // })



    // Component Did Mount
    useEffect(() => {
        
        window.scrollTo(0,0)
       getProject(projectID);
       
       
      }, []);


      
    if(loadingPage){
      return(
        <>
            <header>
                <div style={{margin: '0 auto', width: '100vw', maxWidth: 1920, display: 'flex'}}>
                    <Link id={styles.toHomeBtn} to="/" >Return to Home</Link>
                </div>
            </header>
            <div className={styles.loadingContainer}>
                <div style={{flex: 1, columnGap: '2rem'}} className='flex-container-horz'>
                    <div className={styles.left} style={{height: '100%'}}>
                        <div className={styles.shimmerContainer} style={{width: '40%', height: 64, maxWidth: 320}}>
                            <div className={styles.shimmer}></div>
                        </div>
                        <div className={styles.shimmerContainer} style={{width: '55%', height: 24, maxWidth: 475, marginTop: 24}}>
                            <div className={styles.shimmer}></div>
                        </div>
                        <div className={styles.shimmerContainer} style={{width: '55%', height: 24, maxWidth: 475, marginTop: 12}}>
                            <div className={styles.shimmer}></div>
                        </div>
                        <div className={styles.shimmerContainer} style={{width: '100%', height: 250 , marginTop: 80}}>
                            <div className={styles.shimmer}></div>
                        </div>
                    </div>
                    <div className={styles.right} style={{height: '100%'}}>
                    </div>
                </div>
                <div className={styles.readMore} style={{flex: 0}} />
            </div>
        </>
        
      )
    }else{
        if(locked){
            return(
                <div>
                    <h1>LOCKED</h1>
                </div>
              )
        }else{
            console.log(heroType)
            return(
                <>
                    <header>
                        <div style={{margin: '0 auto', width: '100vw', maxWidth: 1920, display: 'flex'}}>
                            <Link id={styles.toHomeBtn} to="/" >Return to Home</Link>
                        </div>
                        <motion.div
                            className={styles.progress}
                            style={{background: color}}
                            animate={{ scaleX: yProgress }}
                            transition={{ duration: 0.2 }}
                        />
                    </header>
                    <div ref={containerRef} className={styles.container}>
                        <div className={styles.intro}>
                            <div style={{flex: 1, columnGap: '2rem'}} className='flex-container-horz'>
                                <div className={styles.left}>
                                    <h1 className={styles.header}>{projectData ? projectData.title : "Loading..."}</h1>
                                    <h5 className={styles.subtitle}>{projectData ? projectData.subtitle : null}</h5>
                                    <div className={styles.sevenSixEight}>
                                        <div className={styles.metaDataCont}>
                                                <p className={styles.metaTitle}>My Roles</p>
                                                <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.roles.map((x, i) => i !== projectData.roles.length - 1 ? `${x}, ` : x): null}</p>
                                            </div>
                                        <div className={styles.metaDataCont}>
                                                <p className={styles.metaTitle}>Duration</p>
                                                <p className={styles.metaData}>{projectData ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.start_date.seconds+"000") : null} - {projectData && projectData.end_date ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.end_date.seconds+"000") : "Current"}</p>
                                            </div>
                                            <div className={styles.metaDataCont}>
                                                <p className={styles.metaTitle}>Tools</p>
                                                <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.tools.map((x, i) => i !== projectData.tools.length - 1 ? `${x}, ` : x): null}</p>
                                            </div>
                                    </div>
                                    <div style={heroType == 'phone' ? {overflowY: 'clip'} : {}} className={styles.heroContainer}>
                                        {heroType == 'phone' ?
                                        <motion.div style={{marginTop: '90px'}} initial={{ marginTop: '90px' }} whileInView={{ marginTop: '0px' }} transition={{ duration: .5 }} viewport={{ once: true }}>
                                            <Phone contentType="video" content="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4" className={styles.phone}/>
                                        </motion.div>
                                        : heroType == 'computer' ?
                                        <motion.div initial={{ marginLeft: '-50px', opacity: 0 }} whileInView={{ marginLeft: 0, opacity: 1 }} transition={{ duration: .5 }} viewport={{ once: true }} style={{marginLeft: '-50px', opacity: 0, marginTop: 160, maxWidth: 620 }}>
                                            <Computer contentType="video" content="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4" />
                                        </motion.div>
                                        : 
                                            <motion.img initial={{ marginLeft: '-50px', opacity: 0 }} whileInView={{ marginLeft: 0, opacity: 1 }} transition={{ duration: .5 }} viewport={{ once: true }} style={{width: '95%', maxWidth: 900, maxHeight: 900, height: '90%', objectFit: 'cover', marginLeft: '-50px', opacity: 0}} src={"https://picsum.photos/1600/900"} />
                                        }
                                       
                                        <div style={width > 1920 ? {left: (width*-.11 - (width-1920)/2), width: width * .7} : width > 1024 ? {left: '-11vw', width: width * .7} :  width > 768 ? {left: '-11vw', width: width * .8} :  width > 480 ? {left: '-11vw', width: width * .85} : {left: '-11vw', width: width * .85}} className={styles.herobg}/>
                                    </div>
                                    
                                </div>
                                <div className={styles.right}>
                                    <span className={styles.meta}>
                                        <div className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>My Roles</p>
                                            <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.roles.map((x, i) => i !== projectData.roles.length - 1 ? `${x}, ` : x): null}</p>
                                        </div>
                                        <div className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>Duration</p>
                                            <p className={styles.metaData}>{projectData ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.start_date.seconds+"000") : null} - {projectData && projectData.end_date ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.end_date.seconds+"000") : "Current"}</p>
                                        </div>
                                        <div className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>Tools</p>
                                            <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.tools.map((x, i) => i !== projectData.tools.length - 1 ? `${x}, ` : x): null}</p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.readMore} style={{flex: 0}}>
                                <p>Read More</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
                            </div>

                            
                        </div>
                        <div className={`${styles.projectSection} ${styles.quoteSection}`} style={{}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <h4 className={styles.quote}>{projectData ? projectData.quote : ""}</h4>
                            </div>
                            <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <p style={{whiteSpace: 'pre-line', lineBreak: 'anywhere'}}>{projectData ? projectData.bio.replaceAll(`<br>`, `\n\n`) : ""}</p>
                            </div>      
                        </div>
                        <ContentComponent 
                            contentType="phone"
                            contentMediaType="image"
                            contentMedia={"url(https://picsum.photos/500/900"}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent 
                            contentType="phone"
                            contentMediaType="video"
                            contentMedia={"https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4"}
                            reversed={true}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent
                            contentType="computer"
                            contentMediaType="image"
                            contentMedia={"url(https://picsum.photos/500/900"}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent
                            contentType="computer"
                            contentMediaType="video"
                            contentMedia={"https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4"}
                            reversed={true}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent
                            contentType="image"
                            contentMediaType={null}
                            contentMedia={"https://picsum.photos/1500/1000"}
                            reversed={false}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent
                            contentType="image"
                            contentMediaType={null}
                            contentMedia={"https://picsum.photos/900/900"}
                            reversed={true}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent
                            contentType={null}
                            contentMediaType={null}
                            contentMedia={null}
                            reversed={false}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        <ContentComponent
                            contentType={null}
                            contentMediaType={null}
                            contentMedia={null}
                            reversed={true}
                            number={1}
                            title="Hello World"
                            description={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                        />
                        
                       
                    </div>
                   
                </>
              )
        }
    }
    
}

export default Project