import React, { useState, createContext, useContext } from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { UserContext } from './UserProvider'
import "../styles/styles.css"

const EntriesContext = createContext()

function EntriesContextProvider(props) {
  const [entries, setEntries] = useState([])

  const { deleteEntry, editEntry } = useContext(UserContext)

  function getEntryById(entryId) {
    axios.get(`/api/entries/${entryId}`)
      .then(res => setEntries(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }


  function postEntry(newEntry) {
    console.log("post new entry", newEntry)
    axios.post("/api/entries", newEntry)
      .then(res => {
        setEntries(prevEntries => [...prevEntries, res.data])
      })
      .catch(err => console.log(err))
  }

  // When entries are submitted, the user will go to the "Your Entries" tab.
  const history = useHistory()

  function submitBtnRedirect() {
    history.push('/api/entries')
  }

  return (
    <EntriesContext.Provider value={{
      getEntryById,
      editEntry,
      postEntry,
      deleteEntry,
      history,
      submitBtnRedirect,
    }}>{props.children}
    </EntriesContext.Provider>
  )
}

const useEntries = () => {
  const context = useContext(EntriesContext)
  if (!context) throw new Error("You must use Provider to consume Context");
  return context
}

export { EntriesContextProvider, useEntries, EntriesContext }