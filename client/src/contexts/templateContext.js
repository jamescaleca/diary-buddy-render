import React, { createContext } from "react"
import affirmations from "../components/affirmationData.js"
import journalPromptsOne from "../components/promptsDataOne.js"
import journalPromptsTwo from "../components/promptsDataTwo.js"
import journalPromptsThree from "../components/promptsDataThree.js"
import { useEntries } from "../contexts/userEntryContext.js"

const TemplateContext = createContext()

function TemplateContextProvider(props) {
  // const {history} = useEntries()
  const dateForToday = new Date();
  const dayOfMonth = dateForToday.getDate();

  // function goBack() {
  //   history.goBack()
  // }

  const dailyAffirmation =
    affirmations.filter(function(message) {
      if(message.date === dayOfMonth){
        return message
      }
    })[0].affirmation
  

  const dailyPromptOne = journalPromptsOne.filter(function(journalOne){
    if(journalOne.date === dayOfMonth){return journalOne}
  })[0].prompt
  
  const dailyPromptTwo = journalPromptsTwo.filter(function(journalTwo){ 
    if(journalTwo.date === dayOfMonth){return journalTwo}
  })[0].prompt
  
  const dailyPromptThree = journalPromptsThree.filter(function(journalThree){ 
    if(journalThree.date === dayOfMonth){return journalThree}
  })[0].prompt
  
  return (
    <TemplateContext.Provider value={{
      // handleSubmit,
      // handleChange,
      // promptInputs,
      // goBack,
      dateForToday,
      dailyAffirmation,
      dailyPromptOne,
      dailyPromptTwo,
      dailyPromptThree
    
    }}>{props.children}
    </TemplateContext.Provider>
  )
}

export {TemplateContextProvider, TemplateContext}