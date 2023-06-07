import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AddEntryForm from "../components/AddEntryForm"
import { UserContext } from "../contexts/UserProvider"
import "../styles/styles.css"

export default function BlankEntryPage() {
  const { postEntry, inputs, initInputs, setInputs } = useContext(UserContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    postEntry(inputs)
    setInputs(initInputs)
    navigate(`/api/entries`)
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