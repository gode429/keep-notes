import React, {Component} from 'react';

import classes from './EditNote.module.css';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-notes';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

class EditNote extends Component {
    state = {
        noteTitle: '',
        noteContent: ''
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
        alert('A Note was submitted: ' + this.state.noteTitle);
        event.preventDefault();
        const note = {
            noteTitle: this.state.noteTitle,
            noteContent: this.state.noteContent,
            userId: this.props.userId
        }
        this.props.onEditNote(note, this.props.token);
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
        note: state.notes.selectedNote
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onEditNote: (noteData, token) => dispatch(actions.editNote(noteData, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EditNote, axios)); 
