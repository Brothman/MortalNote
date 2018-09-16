import React from 'react';
import { connect } from 'react-redux';
import NotebookIndexItem from './notebook_index_item.jsx';
import { getAllNotebooks, getNotebooksNotes } from '../../reducers/selectors.js';

class NotebookIndex extends React.Component {
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
          <img className="new-notebook-icon" />
          <p className="new-notebook">New Notebook</p>
          <img className= "sort-by-icon" />
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
