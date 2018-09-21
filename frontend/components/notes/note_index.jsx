import React from 'react';
import NoteIndexItem from './note_index_item.jsx';

//Destructure notes out of props for cleaner code
const NoteIndex = ( { notes, notebooks, chosenNote } ) => {
  let notesArray;
  if (notes.length > 0) {
     notesArray = notes.map((note, idx) => {
      return <NoteIndexItem key={idx} note={note} chosenNote={chosenNote} />;
    });
  }

  let noteHeader;
  if (Object.keys(notebooks).length === 1) {
    noteHeader = notebooks[Object.keys(notebooks)[0]].title;
  }
  else {
    noteHeader = "All Notes";
  }

  return (
    <div className="note-index-grid">
      <h6 className="note-index-header"> {noteHeader} </h6>

      <div className="note-index-top-items">
        <span className="number-of-notes"> {notes.length} Notes </span>
        <img className="note-index-action-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/actions-big-icon.svg" />
        <img className="note-index-tag-icon" />
      </div>

      <div className="all-notes-grid">
        {notesArray}
      </div>
    </div>
  )
}

export default NoteIndex;
