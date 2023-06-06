import React, { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserProvider"
import "../styles/styles.css"

export default function UserEntries() {
  const { getUserEntries, allEntries } = useContext(UserContext)

  useEffect(() => {
    getUserEntries()
  }, [getUserEntries])

  return (
    <div className='content'>
      <div className='content-container'>
        <h1 className='content-h1'>Your entries</h1>
        <ul className='all-entries'>{allEntries}</ul>
      </div>
    </div>
  )
}