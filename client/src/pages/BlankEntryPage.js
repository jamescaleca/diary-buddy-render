import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AddEntryForm from "../components/AddEntryForm"
import { UserContext } from "../contexts/UserProvider"
import { TemplateContext } from "../contexts/templateContext"
import "../styles/styles.css"

export default function BlankEntryPage() {
  const { postEntry, inputs, initInputs, setInputs } = useContext(UserContext)
  const { dailyAffirmation } = useContext(TemplateContext)
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
        <h3>TODAY'S AFFIRMATION</h3> 
        <div className='affirmation-cont'>
          <h4>{dailyAffirmation}</h4>
        </div>
        <AddEntryForm 
          submit={handleSubmit}
          affirmation={dailyAffirmation}
          inputs={inputs}
          setInputs={setInputs}
        />
      </div>
    </div>
  )
}