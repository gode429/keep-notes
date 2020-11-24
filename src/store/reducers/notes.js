import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    notes: [],
    loading: false,
    purchased: false,
    selectedNote: {}
};

const createNoterInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const createNoterStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const createNoteSuccess = ( state, action ) => {
    const newNote = updateObject( action.noteData, { id: action.noteId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        notes: state.notes.concat( newNote )
    } );
};

const createNoterFail = ( state, action ) => {
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
        case actionTypes.CREATE_NOTE_INIT: return createNoterInit( state, action );
        case actionTypes.CREATE_NOTE_START: return createNoterStart( state, action );
        case actionTypes.CREATE_NOTE_SUCCESS: return createNoteSuccess( state, action )
        case actionTypes.CREATE_NOTE_FAIL: return createNoterFail( state, action );
        case actionTypes.FETCH_NOTES_START: return fetchNotesStart( state, action );
        case actionTypes.FETCH_NOTES_SUCCESS: return fetchNotesSuccess( state, action );
        case actionTypes.FETCH_NOTES_FAIL: return fetchNotesFail( state, action );
        case actionTypes.SELECT_NOTE: return selectNote(state, action);
        default: return state;
    }
};

export default reducer;