import React from "react"
import Navbar from "./Navbar"
import ScratchPad from "./ScratchPad"
import "../styles.css"

function Home() {
    return (
        <>
            <Navbar />
            <div className='content'>
                <div className='content-container'>
                    <h2 className='content-h2'>Hello</h2>
                    <h3 className='content-h3'>Ready to write down some thoughts?</h3>
                    <hr />
                    <ScratchPad />
                </div>
            </div>
        </>
    )
}

export default Home