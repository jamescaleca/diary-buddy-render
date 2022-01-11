import React, { useState } from "react"
import { useEntries } from "../contexts/userEntryContext"
import '../styles.css'

function ScratchPad(props) {
    const initInputs = 
        {
            date: props.date || '',
            entry: props.entry || ''
        }

    const [inputs, setInputs] = useState(initInputs)
    const { postEntry, submitBtnRedirect } = useEntries()

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
        console.log("inputs", inputs)
    }

    function handleSubmit(e) {
        e.preventDefault()
        postEntry(inputs)
        setInputs(initInputs)
        submitBtnRedirect()
    }

    return (
        <>
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
        </>
    )
}

export default ScratchPad