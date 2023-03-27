import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../components/sidebar.module.css'
import skills from '../constants/skills'

function Sidebar(props) {
        const [skill, setSkill] = useState("all")
        const [skillsVisible, setSkillsVisible] = useState(true)

        let delay = (time) => {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        let changeSkill = async(skillSelected) => {
            setSkillsVisible(false)
            await setSkill(skillSelected)
            setSkillsVisible(true)
        }

        let skillsView = (filter) => {
            if(filter == 'all'){
                return skills.map(( x, i ) => <motion.a initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5, delay: i*.025 }}>{x.name}</motion.a>)
            }else{
                return skills.filter(x => x.className == filter).map(( x, i ) => <motion.a initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5, delay: i*.025 }}>{x.name}</motion.a>)
            }
        }

        return(
            <AnimatePresence>
                {props.visible && (
                    <motion.div style={{zIndex: 9999999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .3 }}>
                        <div style={{position: 'fixed', width: '100vw'}}>
                            <div onClick={props.closeHandler} className={styles.overlay}></div>
                            <motion.div style={{width: props.width, overflow: 'scroll', maxWidth: props.maxWidth}} initial={{ right: 0 - props.width }} animate={{ right: 0 }} exit={{ right: 0 - props.width }} transition={{ duration: .3 }} className={styles.container}>
                                
                                <img className={styles.profilePic} src="https://firebasestorage.googleapis.com/v0/b/christopherfrydryck-website.appspot.com/o/B12E7BCD-4718-4CC9-B552-4C0D150D9BA5.JPG?alt=media&token=bca622c4-7a3f-466f-ba09-02b6c3c5d170"/>
                                <div onClick={props.closeHandler} className={styles.closeSidebarBtn}>
                                    <p>Close</p>
                                </div>
                                <div className={styles.socials}>
                                    <a href="mailto:cfrydryck@gmail.com" className={`${styles.socialBtn} ${styles.email}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/chrisfrydryck/" target="_blank" className={`${styles.socialBtn} ${styles.linkedin}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    </a>
                                    <a href="https://github.com/ChristopherFrydryck" target="_blank" className={`${styles.socialBtn} ${styles.github}`}>
                         
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                                        aria-describedby="desc" role="img">
                                        <title>Github</title>
                                        <desc>A solid styled icon from Orion Icon Library.</desc>
                                        <path data-name="layer2"
                                        d="M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z"
                                        fill="#ffffff"></path>
                                        <path data-name="layer1" d="M12.1 45.9c-.1.2-.3.2-.5.1s-.4-.3-.3-.5.3-.2.6-.1c.2.2.3.4.2.5zm1.3 1.5a.589.589 0 0 1-.8-.8.631.631 0 0 1 .7.1.494.494 0 0 1 .1.7zm1.3 1.8a.585.585 0 0 1-.7-.3.6.6 0 0 1 0-.8.585.585 0 0 1 .7.3c.2.3.2.7 0 .8zm1.7 1.8c-.2.2-.5.1-.8-.1-.3-.3-.4-.6-.2-.8a.619.619 0 0 1 .8.1.554.554 0 0 1 .2.8zm2.4 1c-.1.3-.4.4-.8.3s-.6-.4-.5-.7.4-.4.8-.3c.3.2.6.5.5.7zm2.6.2c0 .3-.3.5-.7.5s-.7-.2-.7-.5.3-.5.7-.5c.4.1.7.3.7.5zm2.4-.4q0 .45-.6.6a.691.691 0 0 1-.8-.3q0-.45.6-.6c.5-.1.8.1.8.3z"
                                        fill="#ffffff"></path>
                                        </svg>
                                
                                    </a>

                                    
                                    <a href="https://www.instagram.com/chrisfrydryck/?hl=en" target="_blank" className={`${styles.socialBtn} ${styles.instagram}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                </div>
                                <p className={styles.bio}>My name is Christopher, and I am a product designer and software engineer. I take a lot of inspiration in my design from music since I have a unique neurological condition called chromesthesia.</p>
                                <p className={styles.bio}>In my spare time, you can catch me wrenching on my Volkswagen Bus, playing guitar or working on my company, Riive.</p>
                                <hr/>
                                <div className={styles.skills}>
                                    <div className={styles.skillPills}>
                                        <a onClick={() => changeSkill("all")} className={skill == "all" ? `${styles.all} ${styles.active}` : styles.all}>All Skills</a>
                                        <a onClick={() => changeSkill("des")} className={skill == "des" ? `${styles.des} ${styles.active}` : styles.des}>Design</a>
                                        <a onClick={() => changeSkill("dev")} className={skill == "dev" ? `${styles.dev} ${styles.active}` : styles.dev}>Code</a>
                                        <a onClick={() => changeSkill("res")} className={skill == "res" ? `${styles.res} ${styles.active}` : styles.res}>Research</a>
                                        <a onClick={() => changeSkill("oth")} className={skill == "oth" ? `${styles.oth} ${styles.active}` : styles.oth}>Other Tools</a>
                                    </div>
                                    {skillsVisible ?
                                    <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .3 }} className={styles.skillsResult}>
                                        {skillsView(skill)}
                                    </motion.div>
                                    : null}
                                </div>
                                
                            </motion.div>
                        </div>
                    </motion.div>
                )}
    
            </AnimatePresence>
        )
   
    
}

export default Sidebar