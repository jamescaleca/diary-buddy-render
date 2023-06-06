import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Auth from './components/Auth'
import Home from "./components/Home"
import Navbar from './components/Navbar'
import ProtectedRoute from "./components/ProtectedRoute"
import FilteredEntries from "./components/FilteredEntries"
import UserEntries from "./components/UserEntries"
import Templates from "./components/Templates"
import Template from "./components/Template"
import BlankEntryPage from "./components/BlankEntryPage"
import { UserContext } from './contexts/UserProvider'
import { TemplateContext } from "./contexts/templateContext"

export default function App() {
  const { token } = useContext(UserContext)
  const { dailyPromptOne, dailyPromptTwo, dailyPromptThree } = useContext(TemplateContext)

  return (
    <div className='app'>
      {token && <Navbar />}
      <Switch>
        <Route 
          exact path='/'
          render={() => token ? <Redirect to='/home'/> : <Auth />}
        />
        <ProtectedRoute 
          path='/home'
          component={Home}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/templates'
          component={Templates}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/template-one'
          component={Template}
          dailyPrompt={dailyPromptOne}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/template-two'
          component={Template}
          dailyPrompt={dailyPromptTwo}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/template-three'
          component={Template}
          dailyPrompt={dailyPromptThree}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/api/entries' 
          component={UserEntries}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/search'
          component={FilteredEntries}
          redirectTo='/'
          token={token}
        />
        <ProtectedRoute 
          exact path='/new-entry'
          component={BlankEntryPage}
          redirectTo='/'
          token={token}
        />
      </Switch>
    </div>
  )
}