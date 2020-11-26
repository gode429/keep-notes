import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';  

import Note from '../../components/Note/Note';
import axios from '../../axios-notes';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './FetchNotes.module.css';

class FetchNotes extends Component {
    state = {
        filterText: ''
    }
    componentDidMount () {
        this.props.onFetchNotes(this.props.token, this.props.userId);
    }
    onNoteEditHandler = (note) => {
        this.props.onSelectNote(this.props.token, this.props.userId, note);
        this.props.history.push('/editNote');
}
    render () {
        let notesList = (<div className={classes.spinnerDiv}>
                            <Spinner />
                        </div>
                    );
        let notes = null;
        if ( !this.props.loading ) {
            if(this.state.filterText === ''){
                notes = this.props.notes;
            } else {
                notes = this.props.notes.filter(note => {
                    return  note.noteTitle.toUpperCase().includes(this.state.filterText.toUpperCase()) ? note : null;
                })
            }
            const notegroup = notes.map( note => (
                <Note
                    key={note.id}
                    noteId={note.id}
                    noteTitle={note.noteTitle}
                    noteContent={note.noteContent}
                    clicked={this.onNoteEditHandler}
                />
            ) );
            notesList = (
                <div>
                    <div className={classes.textfield}>
                        <TextField
                                id="standard-helperText"
                                label="Search By Note Title"
                                className={classes.TextField}
                                value={this.state.filterText}
                                onChange={event => this.setState({filterText: event.target.value})} 
                        />
                    </div>
                    <div className={classes.flexContainer}>
                        {notegroup}
                    </div>
                </div>
            );
        }

        return (
            <div>
                {notesList}
            </div>   
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes.notes,
        loading: state.notes.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchNotes: (token, userId) => dispatch(actions.fetchNotes(token, userId)),
        onSelectNote: (token, userId, note) => dispatch(actions.selectNote(token, userId, note))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( FetchNotes, axios ) );