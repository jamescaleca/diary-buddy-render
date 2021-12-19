import React, {useState} from "react"
import { Switch, Route } from "react-router-dom"
import axios from "axios"
import Home from "./components/Home"
import FilteredEntries from "./components/FilteredEntries"
import UserEntries from "./components/UserEntries"
import Templates from "./components/Templates"
import TemplateOne from "./components/TemplateOne"
import TemplateTwo from "./components/TemplateTwo"
import TemplateThree from "./components/TemplateThree"
import BlankEntryPage from "./components/BlankEntryPage"

function App() {

    return (
        <>
            <Switch>
                <Route exact path='/'><Home /></Route>
                <Route exact path='/templates'><Templates /></Route>
                <Route exact path='/template-one'><TemplateOne /></Route>
                <Route exact path='/template-two'><TemplateTwo /></Route>
                <Route exact path='/template-three'><TemplateThree /></Route>
                <Route exact path='/user-entries'><UserEntries /></Route>
                <Route exact path='/search'><FilteredEntries /></Route>
                <Route exact path='/new-entry'><BlankEntryPage /></Route>
            </Switch>
            
        </>
    )
}

export default App