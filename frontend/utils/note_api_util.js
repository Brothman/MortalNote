//Jquery AJAX request to send the new note data to the database
export const createNote = (note) => {
  return $.ajax({
    method: 'POST',
    url: '/api/notes',
    data: note
  });
};

//Jquery AJAX request to update a note's content (delta) to the database
export const updateNote = (noteID, delta) => {
  debugger
  return $.ajax({
    method: 'PUT',
    url: `/api/notes/${noteID}`,
    data: {note: {"content": delta}}
  });
};
