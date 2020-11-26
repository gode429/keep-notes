import * as actionTypes from './actionTypes';
import axios from '../../axios-notes';

export const createNote = ( noteData, token ) => {
    return dispatch => {
        dispatch( createNoteStart() );
        axios.post( '/notes.json?auth=' + token, noteData )
            .then( response => {
                dispatch( createNoteSuccess( response.data.name, noteData ) );
            } )
            .catch( error => {
                console.log(error);
                dispatch( createNoteFail( error ) );
            } );
    };
};

export const createNoteStart = () => {
    return {
        type: actionTypes.CREATE_NOTE_START
    };
};

export const createNoteSuccess = ( id, noteData ) => {
    return {
        type: actionTypes.CREATE_NOTE_SUCCESS,
        noteId: id,
        noteData: noteData
    };
};

export const createNoteFail = ( error ) => {
    return {
        type: actionTypes.CREATE_NOTE_FAIL,
        error: error
    };
}

export const createNoteEnd = () => {
    return {
        type: actionTypes.CREATE_NOTE_END
    };
};


export const fetchNotes = (token, userId) => {
    return dispatch => {
        dispatch(fetchNotesStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/notes.json' + queryParams)
            .then( res => {
                const fetchedNotes = [];
                for ( let key in res.data ) {
                    fetchedNotes.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchNotesSuccess(fetchedNotes));
            } )
            .catch( err => {
                dispatch(fetchNotesFail(err));
            } );
    };
};

export const fetchNotesStart = () => {
    return {
        type: actionTypes.FETCH_NOTES_START
    };
};

export const fetchNotesSuccess = ( notes ) => {
    return {
        type: actionTypes.FETCH_NOTES_SUCCESS,
        notes: notes
    };
};

export const fetchNotesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_NOTES_FAIL,
        error: error
    };
};




export const  selectNote = (token, userId, note) => {
    return {
        type: actionTypes.SELECT_NOTE,
        note: note
    };
};




export const editNote = ( noteId, noteData, token ) => {
    return dispatch => {
        dispatch( editNoteStart() );
        // console.log(noteData);
        // console.log(token);
        axios.put( '/notes/' + noteId + '.json?auth=' + token, noteData )
            .then( response => {
                //console.log( response.data );
                dispatch( editNoteSuccess( response.data.name, noteData ) );
            } )
            .catch( error => {
                //console.log(error);
                dispatch( editNoteFail( error ) );
            } );
    };
};

export const editNoteStart = () => {
    return {
        type: actionTypes.EDIT_NOTE_START
    };
};

export const editNoteSuccess = ( id, noteData ) => {
    return {
        type: actionTypes.EDIT_NOTE_SUCCESS,
        noteId: id,
        noteData: noteData
    };
};

export const editNoteFail = ( error ) => {
    return {
        type: actionTypes.EDIT_NOTE_FAIL,
        error: error
    };
}

export const editNoteEnd = () => {
    return {
        type: actionTypes.EDIT_NOTE_END
    };
};




export const deleteNote = (noteId, token) => {
    return dispatch => {
        dispatch( deleteNoteStart() );
        axios.delete( '/notes/' + noteId + '.json?auth=' + token )
            .then( response => {
                dispatch( deleteNoteSuccess() );
            } )
            .catch( error => {
                dispatch( deleteNoteFail( error ) );
            } );
    };
};

export const deleteNoteStart = () => {
    return {
        type: actionTypes.DELETE_NOTE_START
    };
};

export const deleteNoteSuccess = ( ) => {
    return {
        type: actionTypes.DELETE_NOTE_SUCCESS,
    };
};

export const deleteNoteFail = ( error ) => {
    return {
        type: actionTypes.DELETE_NOTE_FAIL,
        error: error
    };
}

export const deleteNoteEnd = () => {
    return {
        type: actionTypes.DELETE_NOTE_END
    };
};
