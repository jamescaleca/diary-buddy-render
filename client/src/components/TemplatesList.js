import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {TemplateContext} from "../contexts/templateContext"

export default function TemplatesList() {
  const { dailyPrompts } = useContext(TemplateContext)

  const mapDailyPrompts = dailyPrompts.map(prompt => (
    <li key={dailyPrompts.indexOf(prompt)}>
      <Link 
        to="/prompt"
        state={{prompt: prompt}}
      >
        {prompt}
      </Link>
    </li>
  ))

  return(
    <ul className="prompts-cards">{mapDailyPrompts}</ul>
  )
}