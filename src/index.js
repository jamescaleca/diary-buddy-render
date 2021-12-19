import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import { BrowserRouter as Router } from 'react-router-dom'
import { EntriesContextProvider } from "./contexts/userEntryContext"
import { TemplateContextProvider } from "./contexts/templateContext"
import "./styles.css"

ReactDOM.render(
    <Router>
        <EntriesContextProvider>
            <TemplateContextProvider>
                <App />
            </TemplateContextProvider>  
        </EntriesContextProvider>
    </Router>, 
    document.getElementById("root")
)