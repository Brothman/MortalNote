//Jquery AJAX request to send the new note data to the database
export const createNote = (note) => {
  return $.ajax({
    method: 'POST',
    url: '/api/notes',
    data: note
  });
};

//Jquery AJAX request to update a note's content (delta) to the database
export const updateNote = (noteID, content, content_plain, title) => {
  return $.ajax({
    method: 'PUT',
    url: `/api/notes/${noteID}`,
    data: {note: {content, content_plain, title}}
  });
};

//Jquery AJAX request to delete a note from the database
export const deleteNote = (noteID) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/notes/${noteID}`,
  });
};


//Jquery AJAX request to update a note's content (deleted = true) to the database
export const tempDeleteNote = (noteID) => {
  return $.ajax({
    method: 'PUT',
    url: `/api/notes/${noteID}`,
    data: { note: { deleted: true } }
  });
};

//Jquery AJAX request to update a note's content (deleted = true) to the database
export const restoreNote = (noteID) => {
  return $.ajax({
    method: 'PUT',
    url: `/api/notes/${noteID}`,
    data: { note: { deleted: false } }
  });
};

//Jquery AJAX request to update a note's content (delta) to the database
export const fetchDeletedNotes = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/notes/deleted`,
  });
};