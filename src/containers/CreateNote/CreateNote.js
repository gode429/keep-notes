import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-notes';
//import { makeStyles } from '@material-ui/core/styles';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import classes from './CreateNote.module.css';

class CreateNote extends Component {
    state = {
        noteTitle: '',
        noteContent: ''
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
        this.props.onCreateNote(note, this.props.token);
    }

    render() {
        let form = (
            <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="standard-helperText"
                        label="Note Title"
                        defaultValue=""
                        className={classes.TextField}
                        onChange={this.handleNoteTitle} 
                    />
                    <br /><br />
                    <textarea 
                        
                        value={this.state.value} 
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
            <div className={classes.CreateNote}>
                <h3>Enter your Note Data</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.notes.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onCreateNote: (noteData, token) => dispatch(actions.createNote(noteData, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CreateNote, axios)); 