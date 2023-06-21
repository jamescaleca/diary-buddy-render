import React, { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import { TemplateContext } from "../contexts/templateContext"

import '../styles/styles.css'

export default function ScratchPad() {
  const { postEntry } = useContext(UserContext)

  const navigate = useNavigate()

  const scratchPadRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    postEntry({ entry: scratchPadRef.current.value })
    navigate('/api/entries')
  }

  return (
    <form onSubmit={handleSubmit} className='scratch-pad-form'>
      <h4 className='content-h4'>Scratch pad</h4>
      <textarea
        name='entry'
        className='scratch-pad'
        rows='10'
        cols='10'
        wrap='soft'
        ref={scratchPadRef}
        placeholder='Start typing...'
      />
      <button className='sp-submit-btn'>Submit</button>
    </form>
  )
}