import React, { useContext } from "react"
import ScratchPad from "../components/ScratchPad"
import TemplatesList from "../components/TemplatesList"
import "../styles/styles.css"
import { UserContext } from "../contexts/UserProvider"
import {TemplateContext} from "../contexts/templateContext"

export default function Home() {
  const { user: { username } } = useContext(UserContext)
  const { dailyAffirmation } = useContext(TemplateContext)

  return (
    <div className='content'>
      <div className='content-container'>
        <h2>{`Welcome, ${username}`}</h2>
        <h2>Here's your daily affirmation:</h2>
        <div className="affirmation-cont">
          <h3>{dailyAffirmation}</h3>
        </div>
        <hr />
        <h3>Ready to write down some thoughts?</h3>
        <ScratchPad />
        <h3>Don't know where to start? Try one of these prompts!</h3>
        <TemplatesList />
      </div>
    </div>
  )
}