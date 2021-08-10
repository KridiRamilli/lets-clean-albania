import { combineReducers } from "redux";
import toolsReducer from "./toolsReducer";
import userReducer from "./userReducer";
import markerReducer from "./markerReducer";

const rootReducer = combineReducers({
  tools: toolsReducer,
  user: userReducer,
  marker: markerReducer,
});

export default rootReducer;
