import React from "react"
import Navbar from "./Navbar"
import "../styles.css"
import { useEntries } from "../contexts/userEntryContext"

function UserEntries() {
    const {allEntries} = useEntries()
    return (
        <>
            <Navbar />
            <div className='content'>
                <div className='content-container'>
                    <h1 className='content-h1'>Your entries</h1>
                    <ul className='all-entries'>{allEntries}</ul>
                </div>
            </div>
        </>
    )
}

export default UserEntries