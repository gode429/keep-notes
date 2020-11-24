import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-notes';
import Card from '../../components/UI/Card/Card';
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
        event.preventDefault();
        const note = {
            noteTitle: this.state.noteTitle,
            noteContent: this.state.noteContent,
            userId: this.props.userId
        }
        this.props.onCreateNote(note, this.props.token);
    }

    onCreateSuccessHandler = () => {
        console.log('hahahahahaha');
        this.props.onCreateNoteEnd();
        this.props.history.push('/fetchNotes');
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
        if(this.props.created){
            form = (
                <Card>
                    <h3>Your Note was Saved Successfully</h3>
                    <button onClick={this.onCreateSuccessHandler}>OK</button>
                        
                </Card>
            )
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
        userId: state.auth.userId,
        created: state.notes.created
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onCreateNoteEnd: () => dispatch(actions.createNoteEnd()),
        onCreateNote: (noteData, token) => dispatch(actions.createNote(noteData, token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CreateNote, axios)); 