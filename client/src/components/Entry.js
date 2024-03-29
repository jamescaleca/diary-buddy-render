import React, {useState, useContext } from "react"
import AddEntryForm from "./AddEntryForm"
import "../styles/styles.css"
import { UserContext } from '../contexts/UserProvider'

export default function Entry(props) {
  const {
    date, 
    location, 
    entry, 
    image, 
    mood, 
    positive, 
    negative, 
    affirmation, 
    prompt
  } = props
  const [editToggle, setEditToggle] = useState(false)
  const { 
    editEntry, 
    inputs, 
    setInputs, 
    deleteEntry, 
    submitBtnRedirect,
    timezone
  } = useContext(UserContext)

  const initInputs = {
    date: date || '',
    affirmation: affirmation || '',
    location: location || '',
    prompt: prompt || '',
    entry: entry || '',
    image: image || '',
    mood: mood || '',
    positive: positive || '',
    negative: negative || ''
  }

  const postEditInputs = {
    date: '',
    affirmation: '',
    location: '',
    prompt: '',
    entry: '',
    image: '',
    mood: '',
    positive: '',
    negative: ''
  }

  function toggle(){
    setEditToggle(prevToggle => !prevToggle)
    setInputs(initInputs)
  }

  function handleSubmit(e) {
    e.preventDefault()
    editEntry(inputs, props._id)
    toggle()
    setInputs(postEditInputs)
    submitBtnRedirect()
  }
  
  return(
    <>
    {editToggle === true ? 
      <AddEntryForm 
        inputs={inputs}
        // setInputs={setInputs}
        date={props.date}
        location={props.location}
        positive={props.positive}
        negative={props.negative}
        entry={props.entry}
        image={props.image}
        mood={props.mood}
        affirmation={props.affirmation}
        prompt={props.prompt}
        _id={props._id}
        toggle={toggle}
        // btnText="Submit Edit"
        submit={handleSubmit}
        editToggle={editToggle}
      /> 
      
      :
      
      <div className="entry">
        <div className='entry-image-container'>
          {image === '' ? null 
            : image === undefined ? null 
            : <img src={image} alt='img' className='entry-image'/>
          }
        </div>
        <h3 className='affirmation'>
          {affirmation === null ? <>{null}</> : affirmation === '' ? <>{null}</> : affirmation === undefined ? <>{null}</> :
            <><b>Affirmation: </b><br></br>{affirmation}</>
          }
        </h3>
        <p>
          {date === null ? null 
            : 
              <>
                <b>Date:</b> {new Date(date)
                  .toLocaleString('en-us', {timeZone: timezone})}
              </> 
          }
        </p>
        <p>
          {location === null ? null
            : location === '' ? null 
            : location === undefined ? null 
            : <><b>Location:</b> {location}</>
          }
        </p>
        <p>
          {props.mood === '' ? null : props.mood === undefined ? null : 
            <><b>Mood</b>: {props.mood}</> 
          }
        </p>
        {/* <p>{!isEntry ? <>Prompt: {prompt}</> : <><b>Entry:</b> {entry}</>}</p> */}
        {/* <p>Entry: {props.entry}</p> */}
        <p>
          {props.positive === '' ? null : props.positive === undefined ? null : 
            <><b>Positives</b>: {props.positive}</>
          }
        </p>
        <p>
          {props.negative === '' ? null : props.negative === undefined ? null : 
            <><b>Negatives</b>: {props.negative}</>
          }
        </p>
        <p>{props.prompt === '' ? null : props.prompt === undefined ? null : 
          <>
            <b>Prompt: {props.prompt}</b>
            {/* {props.prompt === '' ? null : props.prompt === undefined ? null :
            props.prompt === null ? null :
                <p className='prompt-entry'>{props.entry}</p>
            } */}
            
          </>
        }</p>

        {props.entry === '' ? null : props.entry === undefined ? null : 
        props.entry === null ? null : 
          <p>{props.entry}</p>
        }
    
        <div className='entry-btn-container'>
          <button className="delete-btn" onClick={() => deleteEntry(props._id)}>              
            Delete
          </button> 
          <button className="edit-btn" onClick={() => toggle()}>
            Edit
          </button>
        </div>
        <hr/>
      </div>
    }
    </>
  )
}