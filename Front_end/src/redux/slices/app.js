import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSideBar(state, action) {
      state.sidebar.open = !state.sidebar.open;
      // state.sidebar.type = action.payload;
    },
    updateSidebar(state, action) {
      state.sidebar.type = action.payload.type;
    },
  },
});

export default slice.reducer;


export function ToggleSideBar() {
    return async (dispatch, getState) => {
      dispatch(slice.actions.toggleSideBar());
    };
  }
export function UpdateSidebar(type) {
  return async () => {
    dispatch(slice.actions.updateSidebar({ type }));
  };
}
