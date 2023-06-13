import React, { useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import "../styles/styles.css"

export default function FilteredEntries() {
  const { searchResults, filterEntries } = useContext(UserContext)
  const [searchParams] = useSearchParams()

  const entryFilter = searchParams.get("entry")

  useEffect(() => {
    filterEntries(entryFilter)
  })

  return (
    <div className='content'>
      <div className='content-container'>
        <h1 className='content-h1'>Search results</h1>
        <ul className='all-entries'>{searchResults}</ul>
      </div>
    </div>
  )
}