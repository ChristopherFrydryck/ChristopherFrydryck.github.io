import { React, useEffect, useRef, useState  } from 'react';
import { motion, useScroll, useAnimation, filterProps } from "framer-motion";
import { Link, resolvePath, useLocation } from 'react-router-dom';

import Phone from '../../components/phone';
import Computer from '../../components/computer';
import ContentComponent from '../../components/contentComponent';
import RecommendedProjects from '../../components/recommendedProjects';
import Footer from '../../components/footer';

import styles from '../projects/project.module.css'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Data
import projects from '../../constants/projects';

// Functions
import useWindowDimensions from '../../functions/getWindowDimensions';
import { getRoles } from '@testing-library/react';

function Project(){

    const [loadingPage, loadingPageStatus] = useState(false)
    const [projectData, setProjectData] = useState(null)
    const [projectIndex, setProjectIndex] = useState(null)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginValid, setLoginValid] = useState(false)
    const [authenticating, setAuthenticating] = useState(false)
    const [error, setError] = useState(null)
    
    /* Hook for scroll y */
    const { scrollYProgress } = useScroll();
    /* State for progress */
    const [yProgress, setYProgress] = useState(0);

    const { height, width } = useWindowDimensions();
    const containerRef = useRef()
    const imageRef = useRef();

    

    

    const location = useLocation()
    const { projectID, locked, type } = location.state
    const color = type[0] === 'pd' ? 'var(--Purple_Medium)' : type[0] === 'eng' ? 'var(--Pink_Medium)' : type[0] === 'mus' ? 'var(--Light_Blue_Medium)' :  type[0] === 'exp' ? 'var(--Green_Light)' : 'white';

    const db = firebase.firestore();

    const getProject = (pid) => {
        loadingPageStatus(true)
        db.collection('projects').doc(`${pid}`).get().then(res => {
            return res.data()
        }).then((data) => {
            setProjectData(data)
            location.state.projectID = pid;
            location.state.locked = data.password;
            location.state.type = data.type;      
        }).then(() => {
            setTimeout(() => {
                loadingPageStatus(false)
            }, 1000)
        })
    }

    let getOtherProjects = (pid) => {
        for(let i = 0; i < projects.length; i++){
            if(projects[i].hash == pid){
                setProjectIndex(i)
                break;
            }else{
                continue;
            }
        }
    }

    /* trigger when scroll is updated */
    useEffect(() => {
        return scrollYProgress.onChange(p => setYProgress(p));
    }, [scrollYProgress]);


    let signInAttempt = ((userName, password) => {
        setAuthenticating(true);
        firebase.auth().signInWithEmailAndPassword(userName, password).then((user) => {
            return db.collection("users").doc(user.user.uid).get().then((res) => {
                return res.data().notPermissive.includes(projectID)
               
            }).then(res => {
                if(res == true){
                    let error = {
                        code: 'auth/failed-permissions',
                        message: "User does not have permission to this page"
                    }
                    throw error;
                }else{
                    setLoginValid(true);
                    setError(null)
                    setTimeout(() => {
                        setAuthenticating(false);
                    }, 2000)
                    return;
                }
            }).catch(e => {
                throw e
            })
            
            
        }).catch((e) => {
            setLoginValid(false);
            setTimeout(() => {
                setAuthenticating(false);
            }, 1000)

            if(e.code == 'auth/invalid-email'){
                setError("The email provided must follow the name@domain.com format")
            }else if(e.code == 'auth/user-not-found'){
                setError("There is no account under this email")
            }else if(e.code == 'auth/missing-email'){
                setError("Email is a required field")
            }else if(e.code == 'auth/internal-error'){
                setError("Password is a required field")
            }else if(e.code == 'auth/wrong-password'){
                setError("Password is incorrect")
            }else if('auth/failed-permissions'){
                setError("This account does not have permissions to view this project")
            }else{
                setError("There was an issue signing in. Please ensure all information is correct or contact cfrydryck@gmail.com if issues persist.")
            }
        })
    })


    // Component Did Mount
    useEffect(() => {
       window.scrollTo(0,0)
       getProject(projectID);
       getOtherProjects(projectID)
       
      }, []);


    let getContent = () => {

        if(projectData){
            return projectData.content.map((content, index) => {
                return(
                    <ContentComponent 
                        contentType={content.contentType}
                        contentMediaType={content.contentMediaType}
                        contentMedia={content.contentMediaType == 'image' ? `${content.contentMedia}` : content.contentMedia }
                        contentPosition={content.contentPosition ? content.contentPosition : '50% 0%'}
                        number={index + 1}
                        title={content.title}
                        description={content.description.replaceAll(`<br>`, `\n\n`)}
                        reversed={index % 2 == 0 ? false : true }
                    />
                )
            })
        }else{
            return null
        }
    }

    let swapProject = async(pid) => {
        window.scrollTo(0,0);
        setLoginValid(false);
        setUserName("");
        setPassword("");
        await getProject(pid)
        getOtherProjects(pid)

    }


      
    if(loadingPage || !projectData){
      return(
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5 }}>
            <header>
                <div style={{margin: '0 auto', width: '100vw', maxWidth: 1920, display: 'flex'}}>
                    <Link id={styles.toHomeBtn} to="/" >Return to Home</Link>
                </div>
            </header>
            <div className={styles.loadingContainer}>
                <div style={width > 480 ? {flex: 1, columnGap: '2rem'} : {flex: 1, columnGap: '2rem', flexDirection: 'column'}} className='flex-container-horz'>
                    <div className={styles.left} style={{height: '100%'}}>
                        <div className={styles.shimmerContainer} style={{width: '70%', height: 64, maxWidth: 320}}>
                            <div className={styles.shimmer}></div>
                        </div>
                        <div className={styles.shimmerContainer} style={{width: '55%', height: 24, maxWidth: 475, marginTop: 24}}>
                            <div className={styles.shimmer}></div>
                        </div>
                        <div className={styles.shimmerContainer} style={{width: '55%', height: 24, maxWidth: 475, marginTop: 12}}>
                            <div className={styles.shimmer}></div>
                        </div>
                        { width <= 768?
                        <div style={{padding: '24px 0'}}>
                            <div className={styles.shimmerContainer} style={{width: '70%', height: 24, maxWidth: 475, marginTop: 12}}>
                                <div className={styles.shimmer}></div>
                            </div>
                            <div className={styles.shimmerContainer} style={{width: '80%', height: 24, maxWidth: 475, marginTop: 12}}>
                                <div className={styles.shimmer}></div>
                            </div>
                            <div className={styles.shimmerContainer} style={{width: '55%', height: 24, maxWidth: 475, marginTop: 12}}>
                                <div className={styles.shimmer}></div>
                            </div>
                        </div>
                        : null }
                        <div className={styles.shimmerContainer} style={{width: '100%', height: 250 , marginTop: 80}}>
                            <div className={styles.shimmer}></div>
                        </div>
                    </div>
                    <div className={styles.right} style={{height: '100%'}}>
                    </div>
                </div>
                <div className={styles.readMore} style={{flex: 0}} />
            </div>
        </motion.div>
        
      )
    }else{
        if(locked && !loginValid){
            return(
                <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5 }} style={{margin: 'auto', display: 'flex', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '2rem'}}>
                    <div style={authenticating ? {alignItems: 'center'} : {}} className={styles.passwordModal}>
                        { authenticating ? 
                            <div className={styles.ldsEllipsis}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        :
                            <>
                                <span>
                                    <h3>Password Protected</h3>
                                    <p>This page is password protected. Proide a valid login to continue.</p>
                                </span>
                                <span className={styles.inputContainer}>
                                    <label className={styles.inputTotal}>
                                        Email
                                        <input placeholder='name@domain.com' className={styles.input} type="text" value={userName || ""} onChange={(res) => setUserName(res.target.value)}/>
                                    </label>
                                    <label className={styles.inputTotal}>
                                        Password
                                        <input placeholder='•••••••••' className={styles.input} type="password" value={password || ""} onChange={(res) => setPassword(res.target.value)}/>
                                    </label>
                                </span>
                                {error && error !== "" ? 
                                <p className={styles.errorMessage} style={{height: 16}}>{error}</p>
                                : <p style={{height: 16}} /> }
                                <span className={styles.btnContainer}>
                                    <Link style={{flex: 1}} id={styles.toHomeBtn} to="/" >Return to Home</Link>
                                    <a role="button" tabIndex={0} onClick={() => signInAttempt(userName, password)} style={{flex: 2}} id={styles.viewPageBtn}>View Page</a>
                                </span>
                            </>
                            }
                        </div>
                        <div style={{maxWidth: '800px', width: '100%'}}>
                            <RecommendedProjects 
                                prevProj={projects[projectIndex - 1]}
                                nextProj={projects[projectIndex + 1]}
                                prevProjectClick={() => swapProject(projects[projectIndex - 1].hash)}
                                nextProjectClick={() => swapProject(projects[projectIndex + 1].hash)}
                            />
                        </div>
                    
                </motion.div>
              )
        }else{

            return(
                <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5 }}>
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
                                        <motion.div initial={{ top: '50px', opacity: 0 }} whileInView={{ top: 0, opacity: 1 }} transition={{ duration: .5, delay: .1 }} viewport={{ once: true }} style={{ opacity: 0, top: 50 }} className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>My Roles</p>
                                            <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.roles.map((x, i) => i !== projectData.roles.length - 1 ? `${x}, ` : x): null}</p>
                                        </motion.div>
                                        <motion.div  initial={{ top: '50px', opacity: 0 }} whileInView={{ top: 0, opacity: 1 }} transition={{ duration: .5, delay: .2 }} viewport={{ once: true }} style={{ opacity: 0, top: 50 }} className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>Duration</p>
                                            <p className={styles.metaData}>{projectData ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.start_date.seconds+"000") : null} - {projectData && projectData.end_date ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.end_date.seconds+"000") : "Current"}</p>
                                        </motion.div>
                                        <motion.div initial={{ top: '50px', opacity: 0 }} whileInView={{ top: 0, opacity: 1 }} transition={{ duration: .5, delay: .3 }} viewport={{ once: true }} style={{ opacity: 0, top: 50 }} className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>Tools</p>
                                            <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.tools.map((x, i) => i !== projectData.tools.length - 1 ? `${x}, ` : x): null}</p>
                                        </motion.div>
                                    </div>
                                    <div style={projectData && projectData.heroType == 'phone' ? {overflowY: 'clip'} : {}} className={styles.heroContainer}>
                                        {projectData && projectData.heroType == 'phone' ?
                                        <motion.div style={{marginTop: '90px'}} initial={{ marginTop: '90px' }} whileInView={{ marginTop: '0px' }} transition={{ duration: .5 }} viewport={{ once: true }}>
                                            <Phone contentType={projectData.heroMediaType} content={projectData.heroMediaType == "image" ? `url("${projectData.hero}")` : projectData.hero} contentPosition={projectData.heroContentPosition || "50% 0%"} className={styles.phone}/>
                                        </motion.div>
                                        : projectData && projectData.heroType == 'computer' ?
                                        <motion.div initial={{ marginLeft: '-50px', opacity: 0 }} whileInView={{ marginLeft: 0, opacity: 1 }} transition={{ duration: .5 }} viewport={{ once: true }} style={{marginLeft: '-50px', opacity: 0, marginTop: 160, maxWidth: 620 }}>
                                            <Computer contentType={projectData.heroMediaType} content={projectData.heroMediaType == "image" ? `url("${projectData.hero}")` : projectData.hero} contentPosition={projectData.heroContentPosition || "50% 0%"} />
                                        </motion.div>
                                        : projectData && ( projectData.heroType == 'image' || !projectData.heroType ) ? 
                                            <motion.img initial={{ marginLeft: '-50px', opacity: 0 }} whileInView={{ marginLeft: 0, opacity: 1 }} transition={{ duration: .5 }} viewport={{ once: true }} style={{width: '95%', maxWidth: 900, maxHeight: 900, height: '90%', objectFit: 'cover', marginLeft: '-50px', opacity: 0}} src={projectData.hero} />
                                        : null }
                                       
                                        <div style={width > 1920 ? {left: (width*-.11 - (width-1920)/2), width: width * .7} : width > 1024 ? {left: '-11vw', width: width * .7} :  width > 768 ? {left: '-11vw', width: width * .8} :  width > 480 ? {left: '-11vw', width: width * .85} : {left: '-11vw', width: width * .85}} className={styles.herobg}/>
                                    </div>
                                    
                                </div>
                                <div className={styles.right}>
                                    <span className={styles.meta}>
                                        <motion.div initial={{ top: '50px', opacity: 0 }} whileInView={{ top: 0, opacity: 1 }} transition={{ duration: .5, delay: .1 }} viewport={{ once: true }} style={{ opacity: 0, top: 50 }} className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>My Roles</p>
                                            <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.roles.map((x, i) => i !== projectData.roles.length - 1 ? `${x}, ` : x): null}</p>
                                        </motion.div>
                                        <motion.div initial={{ top: '50px', opacity: 0 }} whileInView={{ top: 0, opacity: 1 }} transition={{ duration: .5, delay: .2 }} viewport={{ once: true }} style={{ opacity: 0, top: 50 }} className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>Duration</p>
                                            <p className={styles.metaData}>{projectData ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.start_date.seconds+"000") : null} - {projectData && projectData.end_date ? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(projectData.end_date.seconds+"000") : "Current"}</p>
                                        </motion.div>
                                        <motion.div initial={{ top: '50px', opacity: 0 }} whileInView={{ top: 0, opacity: 1 }} transition={{ duration: .5, delay: .3 }} viewport={{ once: true }} style={{ opacity: 0, top: 50 }} className={styles.metaDataCont}>
                                            <p className={styles.metaTitle}>Tools</p>
                                            <p className={styles.metaData} style={{textTransform: 'capitalize'}}>{projectData ? projectData.tools.map((x, i) => i !== projectData.tools.length - 1 ? `${x}, ` : x): null}</p>
                                        </motion.div>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.readMore} style={{flex: 0}}>
                                <p>Read More</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
                            </div>

                            
                        </div>
                        <div className={`${styles.projectSection} ${styles.quoteSection}`}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <h4 className={styles.quote}>{projectData ? projectData.quote : ""}</h4>
                            </div>
                            <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <p style={{whiteSpace: 'pre-line', lineBreak: 'anywhere'}}>{projectData ? projectData.bio.replaceAll(`<br>`, `\n\n`) : ""}</p>
                            </div>      
                        </div>
                        {getContent()}
                        {/* <ContentComponent 
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
                         */}
                       
                    </div>
                    <RecommendedProjects 
                        prevProj={projects[projectIndex - 1]}
                        nextProj={projects[projectIndex + 1]}
                        prevProjectClick={() => swapProject(projects[projectIndex - 1].hash)}
                        nextProjectClick={() => swapProject(projects[projectIndex + 1].hash)}
                    />
                   <Footer />
                </motion.div>
              )
        }
    }
    
}

export default Project