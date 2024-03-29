import React, { useState, useContext } from 'react'
import AuthForm from '../components/AuthForm.js'
import { UserContext } from '../contexts/UserProvider.js'
import '../styles/styles.css'

const initInputs = {username: '', password: ''}

export default function AuthPage() {
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

  function handleChange(e) {
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm() {
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className='content'>
      <div className='content-container'>
        <h1 id='site-title'>Diary Buddy</h1>
        { !toggle ? 
          <>
            <AuthForm 
              handleChange={handleChange}
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText='Sign up'
              errMsg={errMsg}
            />
            <button className='member-btn' onClick={toggleForm}>Already a member?</button>
          </>
        :
          <>
            <AuthForm 
              handleChange={handleChange}
              handleSubmit={handleLogin}
              inputs={inputs}
              btnText='Login'
              errMsg={errMsg}
            />
            <button className='member-btn' onClick={toggleForm}>Not a member?</button>
          </>
        }
      </div>
    </div>
  )
}