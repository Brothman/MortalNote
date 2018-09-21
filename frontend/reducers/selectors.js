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

export const getNotebooksNotesNormalized = ( notes, noteIDS ) => {
  const normalizedNotes = {};
  noteIDS.forEach((noteID) => {
    normalizedNotes[noteID] = notes[noteID];
  });
  return normalizedNotes;
}

export const getAllNotes = ( { notes }) => {
  //this function is used to place the most recent notes on top
  const sortByMostRecent = (a, b) => {
    let comparison = 0;
    const d1 = new Date(a.updated_at);
    const d2 = new Date(b.updated_at);

    if (d1.getTime() < d2.getTime()) {
      comparison = 1;
    } else {
      comparison = -1;
    }

    return comparison;
  }

  //Since we normalized our data, each notebook is under a key of its ID
  //So we map through each ID key, and return an array filled with the notebooks
  //Underneath each ID.
  const noteArray = Object.keys(notes).map(id => notes[id]);

  if (noteArray.length > 0) {
    return noteArray.sort(sortByMostRecent);
  }
  return noteArray;
};
