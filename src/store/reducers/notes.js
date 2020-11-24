import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    notes: [],
    loading: false,
    created: false,
    edited: false,
    selectedNote: {}
};

const createNoteEnd = ( state, action ) => {
    return updateObject( state, { created: false } );
};

const createNoteStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const createNoteSuccess = ( state, action ) => {
    const newNote = updateObject( action.noteData, { id: action.noteId } );
    return updateObject( state, {
        loading: false,
        created: true,
        notes: state.notes.concat( newNote )
    } );
};

const createNoteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};






const editNoteEnd = ( state, action ) => {
    return updateObject( state, { edited: false } );
};

const editNoteStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const editNoteSuccess = ( state, action ) => {
    const newNote = updateObject( action.noteData, { id: action.noteId } );
    return updateObject( state, {
        loading: false,
        edited: true,
        notes: state.notes.concat( newNote )
    } );
};

const editNoteFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};






const fetchNotesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchNotesSuccess = ( state, action ) => {
    return updateObject( state, {
        notes: action.notes,
        loading: false
    } );
};

const fetchNotesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const selectNote = ( state, action ) => {
    //console.log('from notes reducer == ',action.note);
    return updateObject( state, { selectedNote: action.note } );
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_NOTE_END: return createNoteEnd( state, action );
        case actionTypes.CREATE_NOTE_START: return createNoteStart( state, action );
        case actionTypes.CREATE_NOTE_SUCCESS: return createNoteSuccess( state, action )
        case actionTypes.CREATE_NOTE_FAIL: return createNoteFail( state, action );

        case actionTypes.EDIT_NOTE_END: return editNoteEnd( state, action );
        case actionTypes.EDIT_NOTE_START: return editNoteStart( state, action );
        case actionTypes.EDIT_NOTE_SUCCESS: return editNoteSuccess( state, action )
        case actionTypes.EDIT_NOTE_FAIL: return editNoteFail( state, action );

        case actionTypes.FETCH_NOTES_START: return fetchNotesStart( state, action );
        case actionTypes.FETCH_NOTES_SUCCESS: return fetchNotesSuccess( state, action );
        case actionTypes.FETCH_NOTES_FAIL: return fetchNotesFail( state, action );
        case actionTypes.SELECT_NOTE: return selectNote(state, action);
        default: return state;
    }
};

export default reducer;