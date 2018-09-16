export const fetchNotebooksAndNotes = () => {
// Implicit GET request
  return $.ajax({
    url: '/api/notebooks'
  });
};
