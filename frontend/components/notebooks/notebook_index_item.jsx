import React from 'react';
import NoteIndexItem from './note_index_item.jsx';
import ReactDOM from 'react-dom';
import { viewNote } from '../../actions/note_actions.js';
import { receiveNotebooksAndNotes } from '../../actions/notebook_actions.js';
import { getNotebooksNotes, getNotebooksNotesNormalized } from '../../reducers/selectors.js';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class NotebookIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleNoteDropDown = this.handleNoteDropDown.bind(this);
    this.openNotebook = this.openNotebook.bind(this);
    this.state = {
      noteDropDown: false,
    };
  }

  openNotebook(){
    const notebook = this.props.notebook;
    const notes = getNotebooksNotesNormalized(this.props.allNotes, this.props.notebook.notes);
    const obj = {
      notebooks: { [notebook.id]: notebook },
      notes: notes,
    };

    //Fire off a regular action creator, setting notebook to the one notebook
    //And notes to all of that notebook's notes
    this.props.receiveNotebooksAndNotes(obj);

    //open the notes page
    this.props.history.push('/notes');
  }

  handleNoteDropDown(e) {
    const handleViewNote = (note) => {
      this.props.viewNote(note);
      this.openNotebook();
    };

    const target = e.currentTarget.parentNode;
    const arrow = e.currentTarget;

    this.setState({
      noteDropDown: !this.state.noteDropDown
    }, () => {
      //add notes to the page
      if (this.state.noteDropDown) {
        this.props.notes.forEach((note) => {
          let div = document.createElement('div');
          //Add a specific key to the className so we can remove a notebooks
          //specific notes on click, while allowing other notebooks notes
          //to remain visible.
          div.className = `wrapper-div-${this.props.notebook.title}`;
          div.addEventListener('click', handleViewNote.bind(this, note));
          const user = this.props.user;
          const username = user.email.substring(0, user.email.lastIndexOf("@"));
          ReactDOM.render(
            <NoteIndexItem username={username} note={note}/>, div
          );
          target.parentNode.insertBefore(div, target.nextSibling);

          //Turn the arrow upside down (fun effect to show dropdown is open)
          arrow.style.transform = "rotate(90deg)";
        });
      }
      //delete notes from the page
      else {
        let notes = document.getElementsByClassName(`wrapper-div-${this.props.notebook.title}`);
        const notesToRemove = [];

        //Add each note to a new array. Needed to fix a duplicates bug
        //I was encountering. I wish I had more time to delve into why this is
        //Happening.
        for (let i = 0; i < notes.length; i++) {
          notesToRemove.push(notes[i]);
        }

        //Tell the parent to remove the child, instead of removing ourselves.
        //Also to fix that weird bug.
        for (let i = 0; i < notesToRemove.length; i++) {
          notesToRemove[i].remove();
        }

        //Turn the arrow sideways (fun effect to show dropdown is closed)
        arrow.style.transform = "rotate(0)";
      }
    });
  }

  render () {

    let notebook = this.props.notebook;
    let user = this.props.user;

    const d = new Date(notebook.updated_at);

    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const options = { month: 'short', day: 'numeric' };
    const username = user.email.substring(0, user.email.lastIndexOf("@"));
    return (
      <span className="notebook-index-item" >
        <img className="sideways-arrow-icon"
             src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/Sidways-arrow-icon.svg"
             onClick={this.handleNoteDropDown} />
        <img className="notebook-dark-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/dark-notebook-icon-v2.svg" />
        <span className="notebook-item-title" onClick={this.openNotebook}>
          {notebook.title}
          <span className="notebook-notes-number"> ({notebook.notes.length})</span>
        </span>
        <span className="notebook-created-by"> {username}</span>
        <span className="notebook-updated">
          {d.toLocaleDateString("en-US", options)}
        </span>
        <span className="notebook-shared-with"> Only you </span>
        <img className="notebook-actions" />
      </span>
    );
  }
}

const mapStateToProps = ( { entities }, ownProps) => {
  return {
    allNotes: entities.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewNote: (note) => dispatch(viewNote(note)),
    receiveNotebooksAndNotes: (obj) => dispatch(receiveNotebooksAndNotes(obj)),
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookIndexItem));
