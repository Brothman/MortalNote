import React from 'react';
import { viewNote } from '../../actions/note_actions.js';
import { connect } from 'react-redux';

//Destructure note and receiveNewNote and chosenNote out of props for cleaner code
const NoteIndexItem = ( { note, viewNote, chosenNote } ) => {

  const handleViewNote = () => {
    viewNote(note);
  };

  let style;
  if (note.id === chosenNote.id) {
    style = {backgroundColor: '#f2f2f2'};
  }
  else {
    style = {};
  }

  const d = new Date(note.updated_at);
  const options = { month: 'short', day: 'numeric' };

  return (
    <div className="note-index-item-grid" onClick={handleViewNote} style={style}>
      <p className="note-ii-title"> { note.title } </p>
      <p className="note-ii-excerpt"> { note.content_plain } </p>
      <p className="note-ii-last-updated"> {d.toLocaleDateString("en-US", options)} </p>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewNote: (note) => dispatch(viewNote(note))
  };
};


export default connect(null, mapDispatchToProps)(NoteIndexItem);
