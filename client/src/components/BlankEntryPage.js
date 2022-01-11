import React from "react"
import AddEntryForm from "./AddEntryForm"
import Navbar from "./Navbar"
import "../styles.css"

function BlankEntryPage() {
    return (
        <>
            <Navbar />
            <div className='content'>
                <div className='content-container'>
                    <AddEntryForm />
                </div>
            </div>
        </>
    )
}

export default BlankEntryPage