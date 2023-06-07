import React, { useContext } from "react"
import ScratchPad from "../components/ScratchPad"
import "../styles/styles.css"
import { UserContext } from "../contexts/UserProvider"
import {TemplateContext} from "../contexts/templateContext"

export default function Home() {
  const { user: { username } } = useContext(UserContext)
  const { dailyAffirmation } = useContext(TemplateContext)

  return (
    <div className='content'>
      <div className='content-container'>
        <h2 className='content-h2'>{`Welcome, ${username}`}</h2>
        <h2 className="content-h2">Here's your daily affirmation:</h2>
        <h3 className="content-h3">{dailyAffirmation}</h3>
        <hr />
        <h3 className='content-h3'>Ready to write down some thoughts?</h3>
        <ScratchPad />
      </div>
    </div>
  )
}