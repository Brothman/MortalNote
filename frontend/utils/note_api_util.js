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
  // debugger
  return $.ajax({
    method: 'PUT',
    url: `/api/notes/${noteID}`,
    data: {note: {content, content_plain, title}}
  });
};

//Jquery AJAX request to update a note's content (delta) to the database
export const deleteNote = (noteID) => {
  // debugger
  return $.ajax({
    method: 'DELETE',
    url: `/api/notes/${noteID}`,
  });
};
