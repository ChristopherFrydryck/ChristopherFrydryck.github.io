import '../../App.css'
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

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
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'visible';
        }

        
    })

    useEffect(() => {
        showProjects(false)
        setTimeout(() => {
            showProjects(true)
          }, 250)
    }, [homeActiveTab])

    const myProjects = (filter) => {
        
        let n = 0;
        return projects.map((x, i) => {
            if(x.visible && x.type.includes(filter) || filter == 'all'){
                n++;
                return(    
                    <ProjectCard
                        key={n}
                        title={x.name} 
                        subtitle={x.about} 
                        destination={`/${x.hash}`}
                        type={x.type}
                        colorFirst={false}
                        locked={x.password_protected}
                        state={{projectID: x.hash, locked: x.password_protected, type: x.type, heroType: x.heroType}}

                        devices={x.devices} 
                        phoneContent="url(https://picsum.photos/200/300)"
                        phoneContentType="image"
                        phoneContentPosition="50% 50%"
                        computerContent="url(https://picsum.photos/200/300)"
                        computerContentType="image"
                        computerContentPostion="50% 50%" 
                        
                        sideImg={x.hero} 
                        heroType={"computer"} 

                        delay={n * .1}
                    />
                )
            }else{
                return null
            }
         })}

        
    


    return (
        <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .5 }} className="flex-container-vert">
            <Sidebar 
                closeHandler={() => showSidebar(false)} 
                visible={sidebarVisible} 
                width={width > 767 ? 400 : width * .75}
            />
            

            <div className='intro'>
                <h1>👋 Hey, my name is Christopher. I am a <motion.a onClick={() => setHomeActiveTab("pd")} className="product-designer-link" initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .1 }}>product designer</motion.a>, <motion.a onClick={() => setHomeActiveTab("eng")} className="software-engineer-link" initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .25 }}>software engineer</motion.a>, <motion.a onClick={() => setHomeActiveTab("mus")} href="#" className="musician-link" initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .45 }}>musician</motion.a> & <motion.a onClick={() => setHomeActiveTab("exp")} href="#" className="explorer-link" initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .65 }}>explorer</motion.a>.</h1>
            </div>

            <Navbar 
                onPress={(res) => setHomeActiveTab(res.target.parentElement.className.split(" ")[0])} 
                onPressAbout={() => showSidebar(true)}
                active={homeActiveTab}
            />

            <div className='container'>
                

            {/* <Computer /> */}
            {/* <Phone content="url(https://picsum.photos/200/300)" contentPosition="50% 50%"/>

            <Phone contentType="video" content="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/small_2x.mp4"/> */}

            {/* <Link to="/test">Hello</Link>
            <h2>Hello {homeActiveTab} ♥️</h2> */}
            {projectsVisible ? 
            <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{opacity: 0}} transition={{ duration: .2 }}  className="projectList">
                {myProjects(homeActiveTab)}
                
                {/* <ProjectCard 
                    phoneContent="url(https://picsum.photos/200/300)" 
                    locked={true}
                    phoneContentPosition="50% 50%"
                    computerContent="url(https://picsum.photos/200/300)" 
                    devices={["computer", "phone"]} type={["pd"]} 
                    title="Akasjldf asjdklf jasdlkfj asdlfkj dsflksadfklasdflk sadf" subtitle="aklsdf kladskjfj jlkasdfj lkadsfj lakdsjf jlkadsfj laskdfj lkadsfj lkasdfj jlaksdfj flksdajf lkdsafj jlkdasf jlkasdfj lkasdfj jlkasd jflkasdjfjlkasdj flkasdj flkasdj flkasjd fjlfkasdjjflkas djflka sjdflka sjdjflkadslkfasdlkfladksfj j" destination="/test" 
                    sideImg="url(https://picsum.photos/200)"/>
                <ProjectCard locked={true} devices={["computer"]}
                computerContent="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"  computerContentType="video" computerContentPostion="20%" colorFirst={true} type={["eng"]} title="Akasjldf asjdklf " subtitle="aklsdf kladskjfj jlkasdfj lkadsfj lakdsjf jlkadsfj laskdfj lkadsfj lkasdfj "destination="/test" sideImg="url(https://picsum.photos/200)"/>
                <ProjectCard locked={true} phoneContentType="video" devices={["phone"]} type={["mus"]} phoneContent="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" phoneContentPosition="50% 50%" destination="/test" sideImg="url(https://picsum.photos/200)" title="Akasjldf asjdklf jasdlkfj asdlfkj dsflksadfklasdflk sadf" subtitle="aklsdf kladskjfj jlkasdfj lkadsfj lakdsjf jlkadsfj laskdfj lkadsfj lkasdfj jlaksdfj flksdajf lkdsafj jlkdasf jlkasdfj lkasdfj jlkasd jflkasdjfjlkasdj flkasdj flkasdj flkasjd fjlfkasdjjflkas djflka sjdflka sjdjflkadslkfasdlkfladksfj j"/>
                <ProjectCard locked={true} devices={["phone", "computer"]} computerContent="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" phoneContent="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" computerContentType="video" phoneContentType="video" type={["exp"]} destination="/test" sideImg="url(https://picsum.photos/200)"/>
                <ProjectCard colorFirst={true} devices={["phone"]}type={["pd"]} title="Akasjldf asjdklf jasdlkfj asdlfkj dsflksadfklasdflk sadf" subtitle="aklsdf kladskjfj jlkasdfj lkadsfj lakdsjf jlkadsfj laskdfj lkadsfj lkasdfj jlaksdfj flksdajf lkdsafj jlkdasf jlkasdfj lkasdfj jlkasd jflkasdjfjlkasdj flkasdj flkasdj flkasjd fjlfkasdjjflkas djflka sjdflka sjdjflkadslkfasdlkfladksfj j" destination="/test" sideImg="url(https://picsum.photos/200)"/>
                <ProjectCard devices={[]}type={["eng"]} title="Akasjldf asjdklf " subtitle="aklsdf kladskjfj jlkasdfj lkadsfj lakdsjf jlkadsfj laskdfj lkadsfj lkasdfj "destination="/test" sideImg="url(https://picsum.photos/200)"/> */}
            </motion.div> : <div style={{height: '100vh'}}/>}
            </div>
            <div onClick={() => showSidebar(true)} className="aboutBubble">
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