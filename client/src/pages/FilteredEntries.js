import React, { useContext } from "react"
import { UserContext } from "../contexts/UserProvider"
import "../styles/styles.css"

export default function FilteredEntries() {
  const { searchResults } = useContext(UserContext)

  return (
    <div className='content'>
      <div className='content-container'>
        <h1 className='content-h1'>Search results</h1>
        <ul className='all-entries'>{searchResults}</ul>
      </div>
    </div>
  )
}