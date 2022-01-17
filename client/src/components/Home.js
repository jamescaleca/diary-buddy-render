import React, { useContext } from "react"
import Navbar from "./Navbar"
import ScratchPad from "./ScratchPad"
import "../styles/styles.css"
import { UserContext } from "../contexts/UserProvider"

function Home() {
    const { user: { username } } = useContext(UserContext)


    return (
        <>
            <div className='content'>
                <div className='content-container'>
                    <h2 className='content-h2'>{`Welcome, ${username}`}</h2>
                    <h3 className='content-h3'>Ready to write down some thoughts?</h3>
                    <hr />
                    <ScratchPad />
                </div>
            </div>
        </>
    )
}

export default Home