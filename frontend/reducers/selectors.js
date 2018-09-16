//Destructure notebooks out of the state for cleaner code
export const getAllNotebooks = ( { notebooks }) => {
  //Since we normalized our data, each notebook is under a key of its ID
  //So we map through each ID key, and return an array filled with the notebooks
  //Underneath each ID.
  return Object.keys(notebooks).map(id => notebooks[id]);
};

export const getNotebooksNotes = ( notes, noteIDS ) => {
  return noteIDS.map((noteID) => {
    return notes[noteID];
  });
}
