import React, { useState, useContext } from 'react'
import { useEntries } from '../contexts/userEntryContext.js'
import { UserContext } from '../contexts/UserProvider.js'
import '../styles/styles.css'

function AddEntryForm(props) {
    // const [inputs, setInputs] = useState(initInputs)
    const { submitBtnRedirect } = useEntries()
    const { postEntry, editEntry, editToggle, initInputs, inputs, setInputs } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
        console.log("inputs", inputs)
    }

    function handleSubmit(e) {
        e.preventDefault()
        editToggle ?
        editEntry(inputs, props._id) :
        postEntry(inputs, props._id)
        setInputs(initInputs)
        submitBtnRedirect()
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} className='new-entry-form'>
                <div className='nativeDatePicker'>
                    <label for='date'>Date this entry: </label>
                    <input 
                        value={inputs.date}
                        type='date' 
                        id='date' 
                        name='date' 
                        onChange={handleChange}
                    />
                    <span className='validity'></span>
                </div>
                <input 
                    type='text'
                    name='location'
                    className='location'
                    value={inputs.location}
                    onChange={handleChange}
                    placeholder='Location'
                />
                <textarea 
                    name='entry'
                    className='entry'
                    value={inputs.entry}
                    onChange={handleChange}
                    placeholder='Let me hear your thoughts...'
                    required={true}
                />
                <label for='mood'>Mood:</label>
                <select
                    type='text'
                    id='mood'
                    name='mood'
                    className='mood'
                    value={inputs.mood}
                    onChange={handleChange}
                    placeholder='Mood'
                >
                    <option value=''>-Select Mood-</option>
                    <option value='rad'>😀rad</option>
                    <option value='good'>🙂good</option>
                    <option value='meh'>😐meh</option>
                    <option value='bad'>🙁bad</option>
                    <option value='awful'>😢awful</option>
                </select><br />
                <h3 className='content-h3'>Positives:</h3>
                    <textarea
                        name='positive'
                        className='postive-affirmations'
                        rows='10'
                        cols='40'
                        wrap='soft'
                        value={inputs.positive}
                        onChange={handleChange}
                        placeholder='Tell me something positive that happened today...'
                    ></textarea>
                    <h3 className='content-h3'>Negatives:</h3>
                    <textarea
                        name='negative'
                        className='negative-affirmations'
                        rows='10'
                        cols='40'
                        wrap='soft'
                        value={inputs.negative}
                        onChange={handleChange}
                        placeholder='Tell me something negative that happened today...'
                    ></textarea>
                <br/>
                <button className='submit-btn'>Submit Entry</button>
            </form>
        </>
    )
}

export default AddEntryForm