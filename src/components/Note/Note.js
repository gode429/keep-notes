import React from 'react';

import classes from './Note.module.css';

const note = ( props ) => {  
    return (
        <div className={classes.Note} >     
            <h4 onClick={() => props.clicked({
                id: props.noteId, 
                noteTitle: props.noteTitle,
                noteContent: props.noteContent
             })} 
             >
                 {props.noteTitle}
            </h4>
            <p>{props.noteContent.slice(0,100)}</p>
            {/* <p>{props.noteContent}</p> */}
        </div>
    );
};

export default note;