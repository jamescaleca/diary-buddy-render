import React, { useEffect, useState, createContext, useContext } from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import Entry from "../components/Entry"
import { UserContext } from './UserProvider'
import "../styles/styles.css"

const EntriesContext = createContext()

function EntriesContextProvider(props) {
    const [entries, setEntries] = useState([])
    // const [search, setSearch] = useState('')
    // const [searchData, setSearchData] = useState([])

    const { deleteEntry, editEntry } = useContext(UserContext)

    function getEntries() {
        axios.get("/api/entries")
            .then(res => setEntries(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getEntryById(entryId) {
        axios.get(`/api/entries/${entryId}`)
            .then(res => setEntries(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getEntries()
    }, [])

    function postEntry(newEntry) {
        console.log("post new entry", newEntry)
        axios.post("/api/entries", newEntry)
            .then(res => {
                setEntries(prevEntries => [...prevEntries, res.data])
            })
            .catch(err => console.log(err))
    }

    // For Entry Search
    // const filterEntries = (e) => {
    //     axios
    //         .get(`/api/entries/search?entry=${search}`)
    //         .then(res => {
    //             const searchData = res.data
    //             setSearchData(searchData)
    //         })
    //         .catch(err => console.log(err))
    // }

    // const searchResults = searchData.length > 0 ? 
    //     searchData.map(entry => (
    //         <li className='search-entry-li' key={entry._id}>
    //             <Entry
    //                 {...entry}
    //                 key={entry.title}
    //                 deleteEntry={deleteEntry}
    //                 editEntry={editEntry}
    //             />
    //         </li>
    //     ))
    // :
    //     <>
    //         <h3>No results</h3>
    //     </>

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