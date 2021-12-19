import React, {useState} from "react"
import AddEntryForm from "./AddEntryForm"
import "../styles.css"
import { useEntries } from "../contexts/userEntryContext"

function Entry(props) {
    const {date, location, entry, image, mood, _id, positive, negative} = props
    const {deleteEntry, editEntry} = useEntries()
    const [editToggle, setEditToggle] = useState(false)

    function toggle(){
        setEditToggle(prevToggle => !prevToggle)
    }
    console.log(props,"props")
    // console.log(prompt, "prompt")
    
    return(
        <div className="entry">
            <div className='entry-image-container'>
                {image === '' ? <>{null}</> 
                : 
                <img src={image} alt='img' className='entry-image'></img>
                }
            </div>
            <p>{date === null ? <>{null}</> : <><b>Date:</b> {date}</> }</p>
            {/* date is a string */}
            <p>{{location}.length > 0 ? <><b>Location:</b> {location}</> : <>{null}</>}</p>
            <p>{mood === '' ? null : mood === undefined ? null : <><b>Mood</b>: {mood}</> }</p>
            {/* <p>{!isEntry ? <>Prompt: {prompt}</> : <><b>Entry:</b> {entry}</>}</p> */}
            <p>Entry: {entry}</p>
            <p>{positive === '' ? null : positive === undefined ? null : <><b>Positives</b>: {positive}</>}</p>
            <p>{negative === '' ? null : negative === undefined ? null : <><b>Negatives</b>: {negative}</>}</p>
            
            {/* <p>{text === "" ? null : <>Text: {text}</>}</p> */}
        
            <div className='entry-btn-container'>
                <button className="delete-btn" onClick={() => deleteEntry(_id)}>              
                    Delete
                </button> 
                <button className="edit-btn" onClick={() => toggle()}>
                    Edit
                </button>
            </div>
            <hr/>

            {editToggle === true ?
                <>
                    <AddEntryForm 
                        date={date}
                        location={location}
                        positive={positive}
                        negative={negative}
                        entry={entry}
                        image={image}
                        mood={mood}
                        _id={_id}
                        // btnText="Submit Edit"
                        submit={editEntry}
                    /> 
                    <button onClick={() => toggle()}>Close</button>
                </>
                :  
                    null  
            }   
        </div>
    )
}

export default Entry