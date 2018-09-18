import React from 'react';

//Destructure note out of props for cleaner code
const NoteIndexItem = ( { note } ) => {
  const d = new Date(note.updated_at);

  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const options = { month: 'short', day: 'numeric' };

  return (
    <div className="note-index-item-grid">
      <p className="note-ii-title"> { note.title } </p>
      <p className="note-ii-excerpt"> { note.content } </p>
      <p className="note-ii-last-updated"> {d.toLocaleDateString("en-US", options)} </p>
    </div>
  );
};

export default NoteIndexItem;
