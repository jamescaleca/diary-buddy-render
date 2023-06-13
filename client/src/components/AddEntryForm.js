import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserProvider.js'
import '../styles/styles.css'

export default function AddEntryForm(props) {
  const { submit, inputs } = props

  const { handleChange } = useContext(UserContext)

  return (
    <form onSubmit={submit} className='new-entry-form'>
      <h3>Today's Date</h3>
      <input 
        value={inputs.date}
        type='date' 
        id='date' 
        name='date' 
        onChange={handleChange}
      />
      <h3>Location</h3>
      <input 
        type='text'
        name='location'
        className='location'
        value={inputs.location}
        onChange={handleChange}
        placeholder='Location'
      />
      <h3>Mood:</h3>
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
        <option value='😀rad'>😀rad</option>
        <option value='🙂good'>🙂good</option>
        <option value='😐meh'>😐meh</option>
        <option value='🙁bad'>🙁bad</option>
        <option value='😢awful'>😢awful</option>
      </select>
      <h3>Your entry</h3>
      <textarea 
        name='entry'
        className='entry'
        value={inputs.entry}
        onChange={handleChange}
        placeholder='Let me hear your thoughts...'
        required={true}
        rows='10'
        cols='40'
      />
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
  )
}