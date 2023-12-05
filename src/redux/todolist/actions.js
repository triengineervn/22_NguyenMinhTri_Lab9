// actions.js
export const addNote = (note) => ({
  type: "ADD_NOTE",
  payload: note,
});

export const updateNote = (index, note) => ({
  type: "UPDATE_NOTE",
  payload: { index, note },
});

export const deleteNote = (index) => ({
  type: "DELETE_NOTE",
  payload: index,
});

export const loadNotes = (notes) => ({
  type: "LOAD_NOTES",
  payload: notes,
});
