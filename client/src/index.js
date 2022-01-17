import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { EntriesContextProvider } from "./contexts/userEntryContext"
import { TemplateContextProvider } from "./contexts/templateContext"
import UserProvider from './contexts/UserProvider'
import "./styles/styles.css"

ReactDOM.render(
    <Router>
        <UserProvider>
            <EntriesContextProvider>
                <TemplateContextProvider>
                    <App />
                </TemplateContextProvider>  
            </EntriesContextProvider>
        </UserProvider>
    </Router>, 
    document.getElementById("root")
)