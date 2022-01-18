import React from "react"
import AddEntryForm from "./AddEntryForm"
import "../styles/styles.css"

function BlankEntryPage() {
    return (
        <div className='content'>
            <div className='content-container'>
                <AddEntryForm />
            </div>
        </div>
    )
}

export default BlankEntryPage