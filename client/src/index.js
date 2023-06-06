import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { EntriesContextProvider } from "./contexts/userEntryContext"
import { TemplateContextProvider } from "./contexts/templateContext"
import UserProvider from './contexts/UserProvider'
import "./styles/styles.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <EntriesContextProvider>
      <TemplateContextProvider>
        <App />
      </TemplateContextProvider>  
    </EntriesContextProvider>
  </UserProvider>
)