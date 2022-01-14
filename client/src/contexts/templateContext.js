import React, {createContext, useState} from "react"
import affirmations from "../components/affirmationData.js"
import journalPromptsOne from "../components/promptsDataOne.js"
import journalPromptsTwo from "../components/promptsDataTwo.js"
import journalPromptsThree from "../components/promptsDataThree.js"
import { useEntries } from "../contexts/userEntryContext.js"

const TemplateContext = createContext()


function TemplateContextProvider(props) {
    const {history} = useEntries()
    const dateForToday = new Date();
    const dayOfMonth = dateForToday.getDate();

    function goBack() {
        history.goBack()
    }

    const dailyAffirmation =
        // new Date() is a date constructor that gives you the month, day, year, hours, seconds, and milliseconds
        // The getDate() method returns the day of the month for the specified date according to local time.
        affirmations.map(message => {
            return message.date === dayOfMonth ? message.affirmation : null 
        }
        )
    

    const dailyPromptOne = journalPromptsOne.map(journalOne => 
            journalOne.date === dayOfMonth ? journalOne.prompts : null 
        )
    
    const dailyPromptTwo = journalPromptsTwo.map(journalTwo => 
            journalTwo.date === dayOfMonth ? journalTwo.prompts : null 
        )
    
    const dailyPromptThree = journalPromptsThree.map(journalThree => 
            journalThree.date === dayOfMonth ? journalThree.prompts : null 
        )
    
    return (

        <TemplateContext.Provider value={{
            // handleSubmit,
            // handleChange,
            // promptInputs,
            goBack,
            dailyAffirmation,
            dailyPromptOne,
            dailyPromptTwo,
            dailyPromptThree
        
        }}>{props.children}
        </TemplateContext.Provider>
        
    )
}

export {TemplateContextProvider, TemplateContext}