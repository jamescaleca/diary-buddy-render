import React, { useContext } from "react"
import AddEntryForm from "../components/AddEntryForm"
import { UserContext } from "../contexts/UserProvider"
import { useEntries } from "../contexts/userEntryContext"
import "../styles/styles.css"

function BlankEntryPage() {
  const { postEntry, inputs, initInputs, setInputs } = useContext(UserContext)
  const { submitBtnRedirect } = useEntries()

  function handleSubmit(e) {
    e.preventDefault()
    postEntry(inputs)
    setInputs(initInputs)
    submitBtnRedirect()
  }
  return (
    <div className='content'>
      <div className='content-container'>
        <AddEntryForm 
          submit={handleSubmit}
          inputs={inputs}
          setInputs={setInputs}
        />
      </div>
    </div>
  )
}

export default BlankEntryPage