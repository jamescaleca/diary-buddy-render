import React, { useContext } from "react"
import { useEntries } from "../contexts/userEntryContext"
import { UserContext } from "../contexts/UserProvider"
import Navbar from "../components/Navbar"
import "../styles/styles.css"

function FilteredEntries() {
    const { searchResults } = useContext(UserContext)

    return (
        <>
            <Navbar />
            <div className='content'>
                <div className='content-container'>
                    <h1 className='content-h1'>Search results</h1>
                    <ul className='search-results'>{searchResults}</ul>
                </div>
            </div>
        </>
    )
}

export default FilteredEntries