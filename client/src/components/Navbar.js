import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserProvider"
import DiaryLogo from "../assets/DiaryLogo.svg"
import "../styles/styles.css"

export default function Navbar() {
  const { token, logout, search, setSearch } = useContext(UserContext)

  return (
    <header>
      <div className='logo-container'>
        <Link to="/">
          <img className='logo' src={DiaryLogo} alt="logoImg"></img>
        </Link>
      </div>
      <input type='checkbox' className='nav-toggle' id='nav-toggle'></input>
      <nav>
        {token ? 
          <ul className='nav-ul'>
            <li className='form-search-bar'>
              <form>
                <input
                  className='search-bar'
                  type='text'
                  placeholder='Search your entries'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
                <button
                  className='search-button'
                  type='submit'
                  value='Search'
                ><Link to={`/search?entry=${search}`}>Search</Link>
                </button>
              </form>
            </li>
            <li>
              <Link className='nav-link' to='/templates'>Prompts</Link>
            </li>
            <li>
              <Link className='nav-link' to='/api/entries'>Your entries</Link>
            </li>
            <li>
              <Link className='nav-link' to='/new-entry'>+</Link>
            </li>
            <li>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li>
              <button className='logout-btn' onClick={logout}>Logout</button>
            </li>
          </ul>
        :
          null
        }
      </nav>
      <label htmlFor='nav-toggle' className='nav-toggle-label'>
        <span></span>
      </label>
    </header>
  )
}