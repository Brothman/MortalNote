import React from 'react';
import { connect } from 'react-redux';
import NotebookIndexItem from './notebook_index_item.jsx';
import { getAllNotebooks, getNotebooksNotes } from '../../reducers/selectors.js';

class NotebookIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.handleNewNotebook = this.handleNewNotebook.bind(this);
    this.state = {
      newNotebookName: "",
    };
    this.updateTypedState = this.updateTypedState.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
      this.handleCloseModal();
    }
    else {
      //do nothing
    }
  }

  //displays the modal on the screen
  handleNewNotebook() {
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

    //clear the input field when the modal closes
    this.setState({newNotebookName: ""});
    //Ensure the button becomes grey again
    const notebookSubmitButton = document.querySelectorAll("[class^=notebook-continue]")[0];
    notebookSubmitButton.className = "notebook-continue-grey";
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
      })
    }

    return (
      <div className="notebook-index-grid">
        <h6 className="notebook-title">Notebooks</h6>

        <span className="top-of-notebook-index-items">
          <p className="my-notebook-list">My notebook list</p>
          <img className="new-notebook-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/add-notebook-icon.svg"/>
          <p className="new-notebook" onClick={this.handleNewNotebook}>New Notebook</p>
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
export default connect(mapStateToProps)(NotebookIndex);
