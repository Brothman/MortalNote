import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../notebooks/sidebar.jsx';
import NoteIndex from './note_index.jsx';
import Note from './note.jsx';
import { fetchNotebooksAndNotes, receiveNotebooksAndNotes } from '../../actions/notebook_actions.js';
import { clearNote, createNote, receiveUpdatedNote } from '../../actions/note_actions.js';
import { getAllNotes, getAllNotebooks, getNotebooksNotesNormalized } from '../../reducers/selectors.js';
import * as NotebookAPIUtil from '../../utils/notebook_api_util.js';
import NoteNotebookIndexItem from '../notebooks/note_notebook_index_item.jsx';


class NotesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notebooks: [],
      notes: {},
      chosenNotebook: false,
      chosenNotebookSpan: false,
    }
    this.selectNotebook = this.selectNotebook.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNoteSubmitModal = this.handleNoteSubmitModal.bind(this);
    this.selectRandomNote = this.selectRandomNote.bind(this);
  }

  selectNotebook(notebook, e) {
    const target = e.currentTarget;
    //reset the former chosen background, if a span is in state
    if (this.state.chosenNotebookSpan) {
      this.state.chosenNotebookSpan.style.backgroundColor = "white";
    }

    this.setState({
      chosenNotebook: notebook,
      chosenNotebookSpan: target
    }, () => {
        //ensure we change the add-note-modal submit button
        const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[0];
        notebookSubmitButton.className = "notebook-continue-green";

        //lets change the background color of the specific notebook chosen
        target.style.backgroundColor = "#f5f5f5";
    });
  }

  componentDidMount() {
    //fetch all notes and notebooks if no notebook and notes preloaded
    //this.props.notes is an array. It will be an empty array if nothing preloaded.
    if (Object.keys(this.props.notebooks).length === 0 ) {
      this.props.fetchNotebooksAndNotes();
    }
    //Also fetch if we're coming from the trash page
    else if (Object.keys(this.props.notebooks).length === 1 && Object.values(this.props.notebooks)[0].title === "Trash") {
      this.props.fetchNotebooksAndNotes();
    }
    //create a first note if there are no notes in this notebook
    else if(this.props.notes.length === 0) {
      const user_id = this.props.user.id;
      const notebook_id = this.props.notebooks[Object.keys(this.props.notebooks)[0]].id;
      const content = "";
      const content_plain = "";
      const title = "Untitled";
      const deleted = false;

      const note = {
        note: {
          user_id,
          notebook_id,
          content,
          content_plain,
          title,
          deleted
        }
      };

      this.props.createNote(note);
    }
    //store all notebooks and notes in the State for the add-note-modal
    //THIS IS INEFFICIENT USE OF RESOURCES
    //However, I am on a time crunch, and a working inefficient product
    //Is better than a non-working efficient website.
    NotebookAPIUtil.fetchNotebooksAndNotes().then((res) => {
      this.setState({
        notebooks: getAllNotebooks({notebooks: res.notebooks}),
        notes: res.notes,
      });
    });
  }

  //remove the note from the store to say it's unselected
  componentWillUnmount(){
    this.props.clearNote();
  }

  handleCloseModal() {
    const addNotebookModalContainer = document.getElementsByClassName('add-notebook-modal-container')[0];
    addNotebookModalContainer.style.display = "none";

    //ensure both background and modal disappears
    const addNoteModalCard = document.getElementsByClassName('add-note-modal-card')[0];
    addNoteModalCard.style.display = "none";

    //clear chosen notebook when the add-note-modal closes
    if (this.state.chosenNotebookSpan) {
      this.state.chosenNotebookSpan.style.backgroundColor = "white";
    }
    this.setState({chosenNotebook: false, chosenNotebookSpan: false});

    //Ensure the new-note-button becomes grey again
    const notebookSubmitButton2 = document.querySelectorAll("[class^=notebook-continue]")[0];
    notebookSubmitButton2.className = "notebook-continue-grey";
  }

  handleNoteSubmitModal(e) {
    const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[0];
    //only create the note if we have a green submit button
    if (notebookSubmitButton.className === "notebook-continue-green") {
      //for demonstration purposes
      const user_id = this.props.user.id;
      const notebook_id = this.state.chosenNotebook.id;
      const content = "";
      const content_plain = "";
      const title = "Untitled";
      const deleted = false;

      const note = {
        note: {
          user_id,
          notebook_id,
          content,
          content_plain,
          title,
          deleted
        }
      };

      this.props.createNote(note);

      //close the modal
      this.handleCloseModal();
    }
    else {
      //do nothing
    }
  }

  selectRandomNote() {
    //a random note
    let randomNote;
    //Check if it's not an empty object ->
    //Convert keys to array and make sure it has at least one key
    if (Object.keys(this.props.note).length > 0) {
      randomNote = this.props.note;
    }
    else if (Object.keys(this.props.notes).length > 0) {
      randomNote = this.props.notes[Object.keys(this.props.notes)[0]];
    }
    return randomNote;
  }

  render() {
    //a random note
    let randomNote = this.selectRandomNote();

    const addNoteNotebookItems = () => {
      return this.state.notebooks.map((notebook, idx) => {
          // Since data is normalized, each notebook is under a key of its id
          // Consequently we need to get the values, which turns out to be an
          // array of one object, and thus we must take the first item of the
          // resulting array.
          return <NoteNotebookIndexItem key={idx}
                                    notebook={notebook}
                                    selectNotebook={this.selectNotebook.bind(this, notebook)} />;
        });
    };

    return (
      <div className="note-container-grid">
        <Sidebar user={this.props.user}/>
        <NoteIndex notes={this.props.notes}
                   notebooks={this.props.notebooks}
                   chosenNote={randomNote} />
                 <Note note={randomNote} />

          <div className="add-notebook-modal-container" onClick={this.handleCloseModal}>
          </div>

          <div className="add-note-modal-card">
            <h6 className="note-modal-header">Create new note in...</h6>
            <div className="grey-tiny-border-1" />
            <div className="add-note-notebook-items">
              {addNoteNotebookItems().sort((a, b) => {
                if (a.props.notebook.title > b.props.notebook.title) {
                  return 1;
                }
                else {
                  return -1;
                }
              })}
            </div>
            <div className="grey-tiny-border-2" />
            <div className="notebook-modal-buttons">
              <button className="notebook-cancel" onClick={this.handleCloseModal}>
                Cancel
              </button>
              <button className="notebook-continue-grey" onClick={this.handleNoteSubmitModal}>
                Continue
              </button>
            </div>
            <img className="add-note-x-icon"
                 src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/x-icon2.svg"
                 onClick={this.handleCloseModal} />
          </div>

      </div>
    );
  }
}

const mapStateToProps = ( { entities } ) => {
  return {
    user: Object.values(entities.user)[0],
    notes: getAllNotes(entities),
    note: entities.note,
    notebooks: entities.notebooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotebooksAndNotes: () => dispatch(fetchNotebooksAndNotes()),
    clearNote: () => dispatch(clearNote()),
    createNote: (note) => dispatch(createNote(note)),
    receiveUpdatedNote: (note) => dispatch(receiveUpdatedNote(note)),
    receiveNotebooksAndNotes: (obj) => dispatch(receiveNotebooksAndNotes(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
