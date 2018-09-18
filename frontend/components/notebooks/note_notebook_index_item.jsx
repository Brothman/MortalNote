import React from 'react';

//Destructure notebook out of props for cleaner code
const NoteNotebookIndexItem = ( { notebook }) => {
  return (
    <span className="note-notebook-index-item" >
      <img className="notebook-dark-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/dark-notebook-icon-v2.svg" />
      <span className="notebook-item-title" >
        {notebook.title}
      </span>
    </span>
  );
};

export default NoteNotebookIndexItem;
