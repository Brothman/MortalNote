import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../notebooks/sidebar.jsx';
import NoteIndex from './note_index.jsx';
import Note from './note.jsx';
import { fetchNotebooksAndNotes } from '../../actions/notebook_actions.js';
import { getAllNotes } from '../../reducers/selectors.js';

class NotesContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNotebooksAndNotes();
    // console.log(this.props.fetchNotebooksAndNotes())
  }

  render() {
    return (
      <div className="note-container-grid">
        <Sidebar user={this.props.user}/>
        <NoteIndex notes={this.props.notes}/>
        <Note note={this.props.fetchNotebooksAndNotes}/>
      </div>
    );
  }
}

const mapStateToProps = ( { entities } ) => {
  return {
    user: Object.values(entities.user)[0],
    notes: getAllNotes(entities),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotebooksAndNotes: () => dispatch(fetchNotebooksAndNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
