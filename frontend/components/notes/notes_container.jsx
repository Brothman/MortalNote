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
    //a random note
    const randomNote = this.props.notes[Object.keys(this.props.notes)[0]];
    return (
      <div className="note-container-grid">
        <Sidebar user={this.props.user}/>
        <NoteIndex notes={this.props.notes}/>
        <Note note={randomNote}/>
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
