import React, {Component} from 'react';

import classes from './EditNote.module.css';
import { connect } from 'react-redux';
import Card from '../../components/UI/Card/Card';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
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
        console.log('EditNotes.js === ',this.props.note);
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
        console.log('edit note == ',note);
    }

    onEditSuccessHandler = () => {
        console.log('hahahahahaha');
        this.props.onEditNoteEnd();
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
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        type="submit"
                    >
                        Save 
                    </Button>
                </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        if(this.props.edited){
            form = (
                <Card>
                    <h3>Your Note was Edited Successfully</h3>
                    <button onClick={this.onEditSuccessHandler}>OK</button>
                        
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
        loading: state.notes.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        note: state.notes.selectedNote,
        edited: state.notes.edited
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onEditNoteEnd: () => dispatch(actions.editNoteEnd()),
        onEditNote: (noteId, noteData, token) => dispatch(actions.editNote(noteId, noteData, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EditNote, axios)); 
