//Jquery AJAX request to send the new note data to the database
export const createNote = (note) => {
  return $.ajax({
    method: 'POST',
    url: '/api/notes',
    data: note
  });
};
