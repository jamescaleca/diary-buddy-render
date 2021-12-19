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

    const encode = (data) => {
        console.log(Object(data))
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    // function getEntries() {
    //     fetch('user-entries')
    //         .then(res => setEntries(res.data))
    //         .catch(err => console.log(err))
    // }

    function getEntries() {
        axios.get("/user-entries")
        .then(res => setEntries(res.data))
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getEntryById(entryId) {
        // fetch(`user-entries/${entryId}`)
        //     .then(res => setEntries(res.data))
        //     .catch(err => console.log(err))
        axios.get(`/user-entries/${entryId}`)
            .then(res => setEntries(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getEntries()
    }, [])

    // function postEntry(newEntry) {
    //     fetch('/user-entries', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //         body: encode({'form-name': 'scratch-pad-form', ...newEntry})
    //     })
    //         .then(res => {
    //             setEntries(prevEntries => [...prevEntries, res.data])
    //         })
    //         .then(() => alert('Success!'))
    //         .catch(err => alert(err))
    // }

    function postEntry(newEntry) {
        const axiosConfig = {
            header: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        axios.post("/user-entries", 
            encode({
                'form-name': 'scratch-pad-form', ...newEntry
            }),
            axiosConfig
        )
            .then(res => {
                setEntries(prevEntries => [...prevEntries, res.data])
            })
            .catch(err => console.log(err))
    }

    // function deleteEntry(entryId) {
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //     }
    //     fetch(`/user-entries/${entryId}`, requestOptions)
    //         .then(res => {
    //             setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId))
    //             //get request goes here
    //             fetch('/user-entries')
    //                 .then(res => setEntries(res.data))
    //                 .catch(err => console.log(err.response.data.errMsg))
    //         })
    //         .catch(err => console.log(err))
    //         .then(() => alert('Delete successful'))
    // }

    function deleteEntry(entryId) {
        axios.delete(`/user-entries/${entryId}`)
            .then(res => {
                setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId))
                axios.get('/entries')
                    .then(res => setEntries(res.data))
            })
            .catch(err => console.log(err))
    }

    function editEntry(updates, entryId) {
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //     body: updates
        // }
        // fetch(`user-entries/${entryId}`, requestOptions)
        //     .then(res => {
        //         setEntries(prevEntries => prevEntries.map(entry => entry._id !== entryId ? entry : res.data))
        //     })
        //     .catch(err => console.log(err))
        axios.put(`/user-entries/${entryId}`, updates)
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
        // fetch(`/user-entries/search?entry=${search}`)
        //     .then(res => {
        //         const searchData = res.data
        //         setSearchData(searchData)
        //     })
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