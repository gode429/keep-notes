import React, {Component} from 'react';

import classes from './EditNote.module.css';
import { connect } from 'react-redux';
import Card from '../../components/UI/Card/Card';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-notes';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

class EditNote extends Component {
    state = {
        noteTitle: this.props.note.noteTitle,
        noteContent: this.props.note.noteContent
    }
    componentDidMount(){
        console.log('EditNotes.js === ',this.props.deleted);
    }
    handleNoteContent = (event) => {
        this.setState({
            ...this.state,
            noteContent: event.target.value
        });
    };
    handleNoteTitle = (event) => {
        this.setState({
            ...this.state,
            noteTitle: event.target.value
        });
    };
    
    handleSubmit = (event) => {
        //alert('A Note was submitted: ' + this.state.noteTitle);
        event.preventDefault();
        const note = {
            noteTitle: this.state.noteTitle,
            noteContent: this.state.noteContent,
            userId: this.props.userId
        }
        this.props.onEditNote(this.props.note.id, note, this.props.token);
    }

    onEditSuccessHandler = () => {
        this.props.onEditNoteEnd();
        this.props.history.push('/fetchNotes');
    }

    deleteHandler = () =>{
        this.props.onDeleteNote(this.props.note.id, this.props.token);
    }
    onDeleteSuccessHandler = () => {
        this.props.onDeleteNoteEnd();
        this.props.history.push('/fetchNotes');
    }
    render() {
        let form = (
            <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="standard-helperText"
                        label="Note Title"
                        defaultValue={this.props.note.noteTitle}
                        className={classes.TextField}
                        onChange={this.handleNoteTitle} 
                    />
                    <br /><br />
                    <textarea 
                        defaultValue={this.props.note.noteContent} 
                        onChange={this.handleNoteContent} 
                        rows="15" cols="50" 
                    />
                    <br /><br />
                    <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} type="submit">
                        Save 
                    </Button>
                    <Button variant="contained" color="primary" size="large" startIcon={<DeleteIcon />}  onClick={this.deleteHandler}>
                        Delete 
                    </Button>
                    
                </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        if(this.props.edited){
            form = (
                <Card onClose={this.onEditSuccessHandler}>
                   Your Note was Edited Successfully  
                </Card>
            )
        }
        if(this.props.deleted){
            form = (
                <Card onClose={this.onDeleteSuccessHandler}>
                   Your Note was Deleted Successfully  
                </Card>
            )
        }
        return (
            <div className={classes.editNote}>
                <h3>Edit your Note </h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.notes.loading,
        note: state.notes.selectedNote,
        edited: state.notes.edited,
        deleted: state.notes.deleted
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onEditNote: (noteId, noteData, token) => dispatch(actions.editNote(noteId, noteData, token)),
        onEditNoteEnd: () => dispatch(actions.editNoteEnd()),
        onDeleteNote: (noteId, token) => dispatch(actions.deleteNote(noteId, token)),
        onDeleteNoteEnd: () => dispatch(actions.deleteNoteEnd())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EditNote, axios)); 
