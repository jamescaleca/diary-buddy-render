import React, { createContext, useState, useEffect } from "react"
import affirmations from "../components/affirmationData.js"
import journalPromptsOne from "../components/promptsDataOne.js"
import journalPromptsTwo from "../components/promptsDataTwo.js"
import journalPromptsThree from "../components/promptsDataThree.js"

const TemplateContext = createContext()

function TemplateContextProvider(props) {
  const [dailyPrompts, setDailyPrompts] = useState([])
  const [dailyAffirmation, setDailyAffirmation] = useState()
  const dateForToday = new Date();
  const dayOfMonth = dateForToday.getDate();

  const getDailyAffirmation = (affirmations) => {
    const affirmation = affirmations.filter(message => {
      if(message.date === dayOfMonth){
        return message
      }
    })[0].affirmation
    setDailyAffirmation(affirmation)
  }
  

  const getDailyPrompt = (journalPrompts) => {
    const prompt = journalPrompts.filter(journalOne => {
      if(journalOne.date === dayOfMonth){return journalOne}
    })[0].prompt
    return setDailyPrompts((prev) => 
      [
        ...prev,
        prompt
      ]
    )
  }

  useEffect(() => {
    getDailyAffirmation(affirmations)
    getDailyPrompt(journalPromptsOne)
    getDailyPrompt(journalPromptsTwo)
    getDailyPrompt(journalPromptsThree)
  }, [])
  
  return (
    <TemplateContext.Provider value={{
      dateForToday,
      dailyAffirmation,
      dailyPrompts
    }}>{props.children}
    </TemplateContext.Provider>
  )
}

export {TemplateContextProvider, TemplateContext}