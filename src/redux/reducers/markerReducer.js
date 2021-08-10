const initialState = {
  activeMarker: null,
};

function markerReducer(state = initialState, action) {
  switch (action.type) {
    case "ACTIVE_MARKER":
      return {
        ...state,
        activeMarker: action.payload,
      };
    default:
      return state;
  }
}

export default markerReducer;
