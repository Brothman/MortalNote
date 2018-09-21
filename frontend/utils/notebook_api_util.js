export const fetchNotebooksAndNotes = () => {
// Implicit GET request
  return $.ajax({
    url: '/api/notebooks'
  });
};

export const createNotebook = (notebook) => {

  return $.ajax({
    method: 'POST',
    url: '/api/notebooks',
    data: {notebook: notebook},
  });
};
