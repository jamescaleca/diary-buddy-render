import React from "react"
import Navbar from "./Navbar"
import "../styles.css"
import { Link } from "react-router-dom"
import templateOne from "../assets/TemplateOne.png"
import templateTwo from "../assets/TemplateTwo.png"
import templateThree from "../assets/TemplateThree.png"

function Templates() {
    return (
        <>
            <Navbar />
            <div className='content'>
                <div className='content-container'>
                    <h2 className='content-h2'>Don't know where to start?</h2>
                    <h3 className='content-h3'>Why not consider one of these templates?</h3>
                    <ul className='templates-list'>
                        <li>
                            <Link to="/template-one">
                            Template One <br/>
                                <img 
                                    className='template-image'
                                    src={templateOne} 
                                    alt='TemplateOne'
                                ></img>
                            </Link>
                        </li>
                        <li>
                            <Link to="/template-two">
                            Template Two <br/>
                                <img 
                                    className='template-image'
                                    src={templateTwo} 
                                    alt='TemplateTwo'
                                ></img>
                            </Link>
                        </li>
                        <li>
                            <Link to="/template-three">
                            Template Three <br/>
                                <img 
                                    className='template-image'
                                    src={templateThree} 
                                    alt='TemplateThree'
                                ></img>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Templates