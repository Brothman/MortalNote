import React from 'react';
import NoteIndexItem from './note_index_item.jsx';
import ReactDOM from 'react-dom';

//Destructure notebook out of props for cleaner code
const NotebookIndexItem = ( { notebook, user, notes }) => {
  console.log(notebook)
  const d = new Date(notebook.updated_at);
  const month = d.getMonth();
  const day = d.getDay();

  const handleNoteDropDown = (e) => {
    const target = e.currentTarget.parentNode;
    //pass props in here, we want to create divs inside the parent div
    notes.forEach((note) => {
      let div = document.createElement('div');
      div.className = "wrapper-div";
      ReactDOM.render(<NoteIndexItem note={note}/>, div)
      target.parentNode.insertBefore(div, target.nextSibling);
    });
  }

  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const options = { month: 'short', day: 'numeric' };
  const username = user.email.substring(0, user.email.lastIndexOf("@"))
  return (
    <span className="notebook-index-item" >
      <img className="sideways-arrow-icon"
           src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/Sidways-arrow-icon.svg"
           onClick={handleNoteDropDown} />
      <img className="notebook-dark-icon" src="https://s3.us-east-2.amazonaws.com/mortalnote-images/evernote-svgs/dark-notebook-icon-v2.svg" />
      <span className="notebook-item-title" >
        {notebook.title}
        <span className="notebook-notes-number"> ({notebook.notes.length})</span>
      </span>
      <span className="notebook-created-by"> {username}</span>
      <span className="notebook-updated">
        {d.toLocaleDateString("en-US", options)}
      </span>
      <span className="notebook-shared-with"> Only you </span>
      <img className="notebook-actions" />
    </span>
  );
}

export default NotebookIndexItem;
