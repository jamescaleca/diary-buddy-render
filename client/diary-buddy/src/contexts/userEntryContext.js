import React, { useEffect, useState, createContext, useContext } from "react"
import {useHistory} from "react-router-dom"
import axios from "axios"
import Entry from "../components/Entry"
import "../styles.css"

const EntriesContext = createContext()

function EntriesContextProvider(props) {
    const [entries, setEntries] = useState([])
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])

    function getEntries() {
        axios.get("/entries")
        .then(res => setEntries(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getEntryById(entryId) {
        axios.get(`/entries/${entryId}`)
            .then(res => setEntries(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getEntries()
    }, [])

    function postEntry(newEntry) {
        console.log("post new entry", newEntry)
        axios.post("/entries", newEntry)
            .then(res => {
                setEntries(prevEntries => [...prevEntries, res.data])
            })
            .catch(err => console.log(err))
    }

    function deleteEntry(entryId) {
        axios.delete(`/entries/${entryId}`)
            .then(res => {
                setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId))
                axios.get('/entries')
                    .then(res => setEntries(res.data))
            })
            .catch(err => console.log(err))
    }

    function editEntry(updates, entryId) {
        axios.put(`/entries/${entryId}`, updates)
            .then(res => {
                setEntries(prevEntries => prevEntries.map(entry => entry._id !== entryId ? entry : res.data))
            })
            .catch(err => console.log(err))
    }

    const allEntries = entries.map(entry => 
        <li>
            <Entry 
                {...entry} 
                key={entry.title}
                deleteEntry={deleteEntry}
                editEntry={editEntry}
            />
        </li>
    )

    // For Entry Search
    const filterEntries = (e) => {
        axios
            .get(`/entries/search?entry=${search}`)
            .then(res => {
                const searchData = res.data
                setSearchData(searchData)
            })
    }

    const searchResults = searchData.length > 0 ? 
        searchData.map(entry => (
            <li className='search-entry-li' key={entry._id}>
                <Entry
                    {...entry}
                    key={entry.title}
                    deleteEntry={deleteEntry}
                    editEntry={editEntry}
                />
            </li>
        ))
    :
        <>
            <h3>No results</h3>
        </>

    // When entries are submitted, the user will go to the "Your Entries" tab.
    const history = useHistory()

    function submitBtnRedirect() {
        history.push('/user-entries')
    }

    return (
        <EntriesContext.Provider value={{
            allEntries,
            searchResults,
            search,
            setSearch,
            searchData,
            setSearchData,
            filterEntries,
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