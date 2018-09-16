import React from 'react';

const NoteIndexItem = ( { note }) => {
  return (
    <span className="note-index-item" >
      <img className="notebook-dark-icon move-right" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/white-paper-icon.svg" />
      <span className="notebook-item-title move-extra-right" >
        {note.title}
        <span className="notebook-notes-number "> (13)</span>
      </span>
      <span className="notebook-created-by"> Bob</span>
      <span className="notebook-updated">
        Today
      </span>
      <span className="notebook-shared-with"> Only you </span>
      <img className="notebook-actions" />
    </span>
  );
};

export default NoteIndexItem;
