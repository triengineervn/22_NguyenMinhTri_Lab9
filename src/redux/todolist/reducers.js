// reducers.js
const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "UPDATE_NOTE":
      const updatedNotes = [...state.notes];
      updatedNotes[action.payload.index] = action.payload.note;
      return {
        ...state,
        notes: updatedNotes,
      };
    case "DELETE_NOTE":
      const filteredNotes = state.notes.filter(
        (_, index) => index !== action.payload
      );
      return {
        ...state,
        notes: filteredNotes,
      };
    case "LOAD_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
