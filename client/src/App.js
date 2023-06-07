import React, { useContext } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NotFound from "./pages/NotFound"
import AuthPage from './pages/AuthPage'
import Home from "./pages/Home"
import BlankEntryPage from "./pages/BlankEntryPage"
import FilteredEntries from "./pages/FilteredEntries"
import UserEntries from "./pages/UserEntries"
import Templates from "./pages/Templates"
import Template from "./pages/Template"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import { UserContext } from './contexts/UserProvider'
import { TemplateContext } from "./contexts/templateContext"

export default function App() {
  const { token } = useContext(UserContext)
  const { dailyPromptOne, dailyPromptTwo, dailyPromptThree } = useContext(TemplateContext)

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route 
              path='/'
              element={token ? <Navigate to='/home'/> : <AuthPage />}
            />
            <Route 
              path='home'
              element={<ProtectedRoute token={token} redirectTo="/">
                <Home />
              </ProtectedRoute>}
            />
            <Route 
              path='templates'
              element={<ProtectedRoute token={token} redirectTo="/">
                <Templates />
              </ProtectedRoute>}
            />
            <Route 
              path='template-one'
              element={<ProtectedRoute token={token} redirectTo="/">
                <Template dailyPrompt={dailyPromptOne} />
              </ProtectedRoute>}
            />
            <Route 
              path='template-two'
              element={<ProtectedRoute token={token} redirectTo="/">
                <Template dailyPrompt={dailyPromptTwo} />
              </ProtectedRoute>}
            />
            <Route 
              path='template-three'
              element={<ProtectedRoute token={token} redirectTo="/">
                <Template dailyPrompt={dailyPromptThree} />
              </ProtectedRoute>}
            />
            <Route 
              path='api/entries' 
              element={<ProtectedRoute token={token} redirectTo="/">
                <UserEntries />
              </ProtectedRoute>}
            />
            <Route 
              path='search'
              element={<ProtectedRoute token={token} redirectTo="/">
                <FilteredEntries />
              </ProtectedRoute>}
            />
            <Route 
              path='/new-entry'
              element={<ProtectedRoute token={token} redirectTo="/">
                <BlankEntryPage />
              </ProtectedRoute>}
            />
            <Route 
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}