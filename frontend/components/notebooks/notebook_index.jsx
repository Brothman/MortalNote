import React from 'react';
import { connect } from 'react-redux';
import NotebookIndexItem from './notebook_index_item.jsx';
import NoteNotebookIndexItem from './note_notebook_index_item.jsx';
import { getAllNotebooks, getNotebooksNotes } from '../../reducers/selectors.js';
import { createNotebook } from '../../actions/notebook_actions.js';
import { createNote } from '../../actions/note_actions.js';
import { withRouter } from 'react-router-dom';

class NotebookIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.handleNewNotebookModal = this.handleNewNotebookModal.bind(this);
    this.state = {
      newNotebookName: "",
      chosenNotebook: false,
      chosenNotebookSpan: false,
    };
    this.updateTypedState = this.updateTypedState.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.selectNotebook = this.selectNotebook.bind(this);
    this.handleNoteSubmitModal = this.handleNoteSubmitModal.bind(this);
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
        const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[1];
        notebookSubmitButton.className = "notebook-continue-green";

        //lets change the background color of the specific notebook chosen
        target.style.backgroundColor = "#f5f5f5";
    });
  }

  updateTypedState(e) {

    this.setState({
      newNotebookName: e.target.value
    }, () => {
      if (this.state.newNotebookName.length > 0) {
        const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[0];
        notebookSubmitButton.className = "notebook-continue-green";
      }
      else {
        const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[0];
        notebookSubmitButton.className = "notebook-continue-grey";
      }
    });
}

  handleSubmitModal(e) {
    const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[0];
    if (notebookSubmitButton.className === "notebook-continue-green") {
      //for demonstration purposes
      const userId = this.props.user.id;
      this.props.createNotebook(this.state.newNotebookName, userId);

      //close the modal
      this.handleCloseModal();
    }
    else {
      //do nothing
    }
  }

  handleNoteSubmitModal(e) {
    //ensure it's the add-note-modal-submit button
    const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[1];
    if (notebookSubmitButton.className === "notebook-continue-green") {
      //for demonstration purposes
      const user_id = this.props.user.id;
      const notebook_id = this.state.chosenNotebook.id;
      const content = "";
      const plain_content = "";
      const title = "";

      const note = {
        note: {
          user_id,
          notebook_id,
          content,
          plain_content,
          title
        }
      };

      this.props.createNote(note);

      //we now want to redirect to the note show page for this new note
      this.props.history.push('/notes');
      //close the modal
      this.handleCloseModal();
    }
    else {
      //do nothing
    }
  }

  //displays the modal on the screen
  handleNewNotebookModal() {
    const addNotebookModalContainer = document.getElementsByClassName('add-notebook-modal-container')[0];
    addNotebookModalContainer.style.display = "block";

    const addNotebookModalCard = document.getElementsByClassName('add-notebook-modal-card')[0];
    addNotebookModalCard.style.display = "grid";

    //ensure the cursor is ready to go in the input textbox
    //Adds ease of use for the user as they can start typing right away
    const notebookInput = document.getElementsByClassName('notebook-modal-input')[0];
    notebookInput.focus();
  }

  //close the modal
  handleCloseModal() {
    const addNotebookModalContainer = document.getElementsByClassName('add-notebook-modal-container')[0];
    addNotebookModalContainer.style.display = "none";

    const addNotebookModalCard = document.getElementsByClassName('add-notebook-modal-card')[0];
    addNotebookModalCard.style.display = "none";

    //ensure both modals close
    const addNoteModalCard = document.getElementsByClassName('add-note-modal-card')[0];
    addNoteModalCard.style.display = "none";

    //clear the input field when the modal closes
    this.setState({newNotebookName: ""});

    //clear chosen notebook when the add-note-modal closes
    if (this.state.chosenNotebookSpan) {
      this.state.chosenNotebookSpan.style.backgroundColor = "white";
    }
    this.setState({chosenNotebook: false, chosenNotebookSpan: false});

    //Ensure the new-notebook-button becomes grey again
    const notebookSubmitButton1 = document.querySelectorAll("[class^=notebook-continue]")[0];
    notebookSubmitButton1.className = "notebook-continue-grey";
    //Ensure the new-note-button becomes grey again
    const notebookSubmitButton2 = document.querySelectorAll("[class^=notebook-continue]")[1];
    notebookSubmitButton2.className = "notebook-continue-grey";
  }

  render() {
    const notebookIndexItems = () => {
      //Need to ensure I have a selector that turns the state of Notebooks
      //into an Array of all the notebook objects
    return this.props.notebooks.map((notebook, idx) => {
        // Since data is normalized, each notebook is under a key of its id
        // Consequently we need to get the values, which turns out to be an
        // array of one object, and thus we must take the first item of the
        // resulting array.
        return <NotebookIndexItem key={idx}
                                  notebook={notebook}
                                  user={this.props.user}
                                  notes={getNotebooksNotes(this.props.notes, notebook.notes)}/>;
        });
    };

    const addNoteNotebookItems = () => {
      return this.props.notebooks.map((notebook, idx) => {
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
      <div className="notebook-index-grid">
        <h6 className="notebook-title">Notebooks</h6>

        <span className="top-of-notebook-index-items">
          <p className="my-notebook-list">My notebook list</p>
          <img className="new-notebook-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/add-notebook-icon.svg"/>
          <p className="new-notebook" onClick={this.handleNewNotebookModal}>New Notebook</p>
          <img className= "sort-by-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/actions-big-icon.svg" />
        </span>

        <span className="column-names">
          <p className="title-cn">TITLE</p>
          <p className="created-by-cn">CREATED BY</p>
          <p className="updated-cn">UPDATED</p>
          <p className="shared-with-cn">SHARED WITH</p>
          <p className="actions-cn">ACTIONS</p>
          <img className="selected-column-arrow" />
          <div className="notebook-index-items">
            {notebookIndexItems()}
          </div>
        </span>

        <div className="add-notebook-modal-container" onClick={this.handleCloseModal}>
        </div>
        <div className="add-notebook-modal-card">
          <h6 className="notebook-modal-header">Create new notebook</h6>
          <p className="notebook-modal-text">
            Notebooks are useful for grouping notes around a common topic.
            They can be private or shared.
          </p>
          <label className="notebook-modal-name">
            Name
            <input type="text"
              className="notebook-modal-input"
              placeholder="Notebook name"
              value={this.state.newNotebookName}
              onChange={this.updateTypedState} />
          </label>
          <div className="grey-tiny-border" />
          <div className="notebook-modal-buttons">
            <button className="notebook-cancel" onClick={this.handleCloseModal}>
              Cancel
            </button>
            <button className="notebook-continue-grey" onClick={this.handleSubmitModal}>
              Continue
            </button>
          </div>
          <img className="x-icon"
               src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/x-icon2.svg"
               onClick={this.handleCloseModal} />
        </div>


        <div className="add-notebook-modal-container" onClick={this.handleCloseModal}>
        </div>

        <div className="add-note-modal-card">
          <h6 className="note-modal-header">Create new note in...</h6>
          <div className="grey-tiny-border-1" />
          <div className="add-note-notebook-items">
            {addNoteNotebookItems()}
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

// Destructure entities out of state for cleaner code
const mapStateToProps = ( { entities } ) => {
  return {
    notebooks: getAllNotebooks(entities),
    user: Object.values(entities.user)[0],
    notes: entities.notes,
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    createNotebook: (title, user_id) => dispatch(createNotebook({title, user_id})),
    createNote: (note) => dispatch(createNote(note)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookIndex));
