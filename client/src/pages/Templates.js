import React from "react"
import TemplatesList from "../components/TemplatesList"
import "../styles/styles.css"

export default function Templates() {
  return (
    <div className='content'>
      <div className='content-container'>
        <h2 className='content-h2'>Don't know where to start?</h2>
        <h3 className='content-h3'>Why not consider one of these templates?</h3>
        <TemplatesList />
      </div>
    </div>
  )
}