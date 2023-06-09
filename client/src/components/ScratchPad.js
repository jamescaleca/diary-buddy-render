import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"

import '../styles/styles.css'

function ScratchPad(props) {
  const initInputs = 
    {
      date: props.date || '',
      entry: props.entry || ''
    }

  // const [inputs, setInputs] = useState(initInputs)
  const { postEntry, inputs, setInputs, submitBtnRedirect } = useContext(UserContext)

  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({...prevInputs, [name]: value}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    postEntry(inputs)
    setInputs(initInputs)
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
        value={inputs.entry}
        onChange={handleChange}
        placeholder='Start typing...'
      />
      <button className='sp-submit-btn'>Submit</button>
    </form>
  )
}

export default ScratchPad