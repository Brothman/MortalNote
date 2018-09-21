import React from 'react';

const NoteIndexItem = ( { note, username }) => {
  const d = new Date(note.updated_at);
  const options = { month: 'short', day: 'numeric' };
  return (
    <span className="note-index-item" >
      <img className="notebook-dark-icon move-right" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/white-paper-icon.svg" />
      <span className="notebook-item-title move-extra-right" >
        {note.title}
      </span>
      <span className="notebook-created-by"> {username} </span>
      <span className="notebook-updated">
        {d.toLocaleDateString("en-US", options)}
      </span>
      <span className="notebook-shared-with"> Only you </span>
      <img className="notebook-actions" />
    </span>
  );
};

export default NoteIndexItem;
