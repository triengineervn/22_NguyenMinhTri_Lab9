// rootReducer.js
import { combineReducers } from "redux";
import notesReducer from "./todolist/reducers";
import authReducer from "./auth/reducers";

const rootReducer = combineReducers({
  notes: notesReducer,
  auth: authReducer,
});

export default rootReducer;
