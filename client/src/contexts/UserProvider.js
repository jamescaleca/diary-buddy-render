import React, { useState } from 'react'
import axios from 'axios'
import Entry from '../components/Entry'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        entries: [],
        errMsg: ''
    }

    const initInputs = 
        {
            date: props.date || '',
            affirmation: props.affirmation || '',
            location: props.location || '',
            prompt: props.prompt || '',
            entry: props.entry || '',
            image: props.image || '',
            mood: props.mood || '',
            positive: props.positive || '',
            negative: props.negative || ''
        }

    // const [ editToggle, setEditToggle ] = useState(false)
    const [userState, setUserState] = useState(initState)
    const [inputs, setInputs] = useState(initInputs)
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([])

    // function toggle(){setEditToggle(prevToggle => !prevToggle)}

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
        console.log("inputs", inputs)
    }

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserEntries()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            entries: []
        })
    }

    function handleAuthError(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    // Get User Entries
    function getUserEntries() {
        userAxios.get('/api/entries')
            .then(res => setUserState(prevState => ({
                ...prevState,
                entries: res.data
            })))
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Search User Entries
    const filterEntries = (e) => {
        userAxios
            .get(`/api/entries/search?entry=${search}`)
            .then(res => {
                const searchData = res.data
                setSearchData(searchData)
            })
            .catch(err => console.log(err))
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
        )) :
        <>
            <h3>No results</h3>
        </>

    // Post new entry
    function postEntry(newEntry) {
        console.log("post new entry", newEntry)
        userAxios.post("/api/entries", newEntry)
            .then(res => {
                // setEntries(prevEntries => [...prevEntries, res.data])
                setUserState(prevState => ({
                    ...prevState,
                    entries: [...prevState.entries, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Edit entry
    function editEntry(updates, entryId) {
        userAxios.put(`/api/entries/${entryId}`, updates)
            .then(res => 
                setUserState(prevState => ({
                ...prevState,
                entries: prevState.entries.map(entry => 
                    entry._id !== entryId ? entry : res.data)
            })))
            .catch(err => console.log(err))
            return getUserEntries()
    }

    // Delete entry
    function deleteEntry(entryId) {
        userAxios.delete(`/api/entries/${entryId}`)
            .then(res => setUserState(prevState => ({
                ...prevState,
                entries: prevState.entries.filter(entry => entry._id !== entryId)
            })))
            .catch(err => console.log(err))
            return getUserEntries()
    }

    const allEntries = userState.entries.map(entry => 
        <li>
            <Entry 
                {...entry} 
                key={`${entry._id}`}
                deleteEntry={deleteEntry}
                editEntry={editEntry}
            />
        </li>
    )

    return (
        <UserContext.Provider
            value={{
                ...userState,
                // editToggle,
                // setEditToggle,
                handleChange,
                signup,
                // toggle,
                login,
                logout,
                resetAuthErr,
                getUserEntries,
                postEntry,
                editEntry,
                deleteEntry,
                inputs,
                setInputs,
                userAxios,
                allEntries,
                initInputs,
                searchResults,
                filterEntries,
                search,
                setSearch,
                searchData,
                setSearchData
            }}
        >{props.children}
        </UserContext.Provider>
    )
}