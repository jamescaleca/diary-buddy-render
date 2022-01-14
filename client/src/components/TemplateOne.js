import React, {useContext, useState} from "react"
import {TemplateContext} from "../contexts/templateContext"
import { useEntries } from "../contexts/userEntryContext"
import { UserContext } from "../contexts/UserProvider"
import Navbar from "./Navbar"

function TemplateOne(props) {
    const {goBack, dailyAffirmation, dailyPromptOne} = useContext(TemplateContext)

    const initTemplateInputs = 
    {
        affirmation: dailyAffirmation || '',
        prompt: dailyPromptOne || '',
        entry: props.entry || '',
        positive: props.positive || '',
        negative: props.negative || '',
        image: props.image || ''
    }
    const [promptInputs, setPromptInputs] = useState(initTemplateInputs)
    const { submitBtnRedirect } = useEntries()
    const { editToggle, inputs, setInputs, editEntry, postEntry, initInputs } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevTempInputs => ({...prevTempInputs, [name]: value}))
        console.log("inputs", inputs)
    }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     postEntry(promptInputs)
    //     setPromptInputs(initTemplateInputs)
    //     submitBtnRedirect()
    // }

    function handleSubmit(e) {
        e.preventDefault()
        editToggle ?
        editEntry(inputs, props._id) :
        postEntry(inputs, props._id)
        setInputs(initInputs)
        submitBtnRedirect()
    }

    return(
        <div>
            <Navbar />
            <div className='content'>
                <div className='content-container'>
                    <h3 className='content-h3'>Affirmation for Today:</h3> 
                        <h4 className='content-h4'>{dailyAffirmation}</h4>
                    <form onSubmit={handleSubmit} className='new-entry-form'>
                        <label for='date'>Date this entry </label>
                        <div className='nativeDatePicker'>
                            <input 
                                type='date' 
                                id='date' 
                                name='date' 
                                onChange={handleChange}
                            /> 
                        </div>
                        <label for='location'>Location </label>
                        <input 
                            type='text'
                            id='location'
                            name='location'
                            className='location'
                            value={inputs.location}
                            onChange={handleChange}
                            placeholder='Location'
                        />
                        <label for='image'>Image </label>
                        <input 
                            type='text'
                            id='image'
                            name='image'
                            className='image'
                            value={inputs.image}
                            onChange={handleChange}
                            placeholder='IMG URL'
                        />
                        <label for='mood'>Mood tracker</label>
                        <select
                            type='text'
                            id='mood'
                            name='mood'
                            className='mood'
                            // value={inputs.mood}
                            onChange={handleChange}
                            placeholder='Mood'
                        >
                            <option value=''>-Select Mood-</option>
                            <option value='rad'>😀rad</option>
                            <option value='good'>🙂good</option>
                            <option value='meh'>😐meh</option>
                            <option value='bad'>🙁bad</option>
                            <option value='awful'>😢awful</option>
                        </select><br/>
                        <h3 className='content-h3'>Journal Prompt</h3>
                        <p>{dailyPromptOne}</p>
                        <textarea
                            name='entry'
                            className='journal-prompt'
                            rows='10'
                            cols='40'
                            wrap='soft'
                            onChange={handleChange}
                            placeholder='Type a response to the journal prompt here...'
                        ></textarea>
                        <h3 className='content-h3'>Positives:</h3>
                        <textarea
                            name='positive'
                            className='postive-affirmations'
                            rows='10'
                            cols='40'
                            wrap='soft'
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
                            onChange={handleChange}
                            placeholder='Tell me something negative that happened today...'
                        ></textarea>
                        <br/>
                        <button className='submit-btn'>Submit</button>
                        <button className='back-btn' onClick={goBack}>Back</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TemplateOne 