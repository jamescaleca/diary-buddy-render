import React, { useContext, useState } from "react"
import {TemplateContext} from "../contexts/templateContext"
import { useEntries } from "../contexts/userEntryContext"
import { UserContext } from "../contexts/UserProvider"
import '../styles/styles.css'

function TemplateOne(props) {
  const { submitBtnRedirect } = useEntries()
  const { editToggle, editEntry, postEntry } = useContext(UserContext)
  const { goBack, dailyAffirmation } = useContext(TemplateContext)
  const { dailyPrompt } = props

  const initTemplateInputs = 
    {
      affirmation: dailyAffirmation[0].affirmation,
      prompt: dailyPrompt[0].prompts,
      date: '',
      location: '',
      mood: '',
      entry: '',
      positive: '',
      negative: '',
      image: ''
    }
  const [ promptInputs, setPromptInputs ] = useState(initTemplateInputs)

  function handleChange(e) {
    const { name, value } = e.target
    setPromptInputs(prevTempInputs => ({
      ...prevTempInputs, 
      [name]: value
    }))
    console.log("inputs", promptInputs)
  }

  function handleSubmit(e) {
    e.preventDefault()
    editToggle ?
    editEntry(promptInputs, props._id) :
    postEntry(promptInputs, props._id)
    submitBtnRedirect()
  }

  return(
    <div className='content'>
      <div className='content-container'>
        <h3 className='content-h3'>TODAY'S AFFIRMATION</h3> 
        <div className='affirmation-cont'>
          <h4 className='content-h4'>{dailyAffirmation[0].affirmation}</h4>
        </div>
        <form onSubmit={handleSubmit} className='new-entry-form'>
          <label for='date'>Date this entry </label>
          <input 
            type='date' 
            id='date' 
            name='date' 
            onChange={handleChange}
            value={promptInputs.date}
          /> 
          <label for='location'>Location </label>
          <input 
            type='text'
            id='location'
            name='location'
            className='location'
            value={promptInputs.location}
            onChange={handleChange}
            placeholder='Location'
          />
          <label for='image'>Image </label>
          <input 
            type='text'
            id='image'
            name='image'
            className='image'
            value={promptInputs.image}
            onChange={handleChange}
            placeholder='IMG URL'
          />
          <label for='mood'>Mood tracker</label>
          <select
            type='text'
            id='mood'
            name='mood'
            className='mood'
            value={promptInputs.mood}
            onChange={handleChange}
            placeholder='Mood'
          >
            <option value=''>-Select Mood-</option>
            <option value='😀rad'>😀rad</option>
            <option value='🙂good'>🙂good</option>
            <option value='😐meh'>😐meh</option>
            <option value='🙁bad'>🙁bad</option>
            <option value='😢awful'>😢awful</option>
          </select><br/>
          <h3 className='content-h3'>JOURNAL PROMPT</h3>
          <p>{dailyPrompt[0].prompts}</p>
          <textarea
            name='entry'
            className='journal-prompt'
            rows='10'
            cols='40'
            wrap='soft'
            value={promptInputs.entry}
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
            value={promptInputs.positive}
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
            value={promptInputs.negative}
            onChange={handleChange}
            placeholder='Tell me something negative that happened today...'
          ></textarea>
          <br/>
          <button className='submit-btn'>Submit</button>
          <button className='back-btn' onClick={goBack}>Back</button>
        </form>
      </div>
    </div>
  )
}

export default TemplateOne 