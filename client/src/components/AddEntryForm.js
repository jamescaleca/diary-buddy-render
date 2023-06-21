import React, { useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../contexts/UserProvider.js'
import '../styles/styles.css'

export default function AddEntryForm(props) {
  const { submit, inputs, affirmation } = props

  const { handleChange, postEntry } = useContext(UserContext)

  const navigate = useNavigate()


  const locationRef = useRef()
  const dateRef = useRef()
  const moodRef = useRef()
  const entryRef = useRef()
  const positiveRef = useRef()
  const negativeRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    postEntry({
      date: dateRef.current.value,
      affirmation: affirmation,
      location: locationRef.current.value,
      entry: entryRef.current.value,
      mood: moodRef.current.value,
      positive: positiveRef.current.value,
      negative: negativeRef.current.value
    })
    navigate(`/api/entries`)
  }

  return (
    <form onSubmit={handleSubmit} className='new-entry-form'>
      <h3>Today's Date</h3>
      <input 
        type='date' 
        id='date' 
        name='date' 
        ref={dateRef}
      />
      <h3>Location</h3>
      <input 
        type='text'
        name='location'
        className='location'
        ref={locationRef}
        placeholder='Location'
      />
      <h3>Mood:</h3>
      <select
        type='text'
        id='mood'
        name='mood'
        className='mood'
        ref={moodRef}
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
        ref={entryRef}
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
        ref={positiveRef}
        placeholder='Tell me something positive that happened today...'
      ></textarea>
      <h3 className='content-h3'>Negatives:</h3>
      <textarea
        name='negative'
        className='negative-affirmations'
        rows='10'
        cols='40'
        wrap='soft'
        ref={negativeRef}
        placeholder='Tell me something negative that happened today...'
      ></textarea>
      <br/>
      <button className='submit-btn'>Submit Entry</button>
    </form> 
  )
}