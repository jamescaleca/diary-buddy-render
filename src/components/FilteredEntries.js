import React from "react"
import { useEntries } from "../contexts/userEntryContext"
import Navbar from "../components/Navbar"
import "../styles.css"

function FilteredEntries() {
    const {searchResults} = useEntries()

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