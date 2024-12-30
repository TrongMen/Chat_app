import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: false, // null
    severity: null,
    message: null,
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
    openSnackBar(state, action) {
      if (!state.snackbar) {
        state.snackbar = {}; // Đảm bảo `snackbar` tồn tại
      }
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      if (!state.snackbar) {
        state.snackbar = {}; // Đảm bảo `snackbar` tồn tại
      }
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    // openSnackBar(state, action) {
    //   state.snackbar.open = true;
    //   state.snackbar.severity = action.payload.severity;
    //   state.snackbar.message = action.payload.message;
    // },
    // closeSnackBar(state) {
    //   state.snackbar.open = false;
    //   state.snackbar.severity = null;
    //   state.snackbar.message = null;
    // },
  },
});

export default slice.reducer;

export function ToggleSideBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function UpdateSidebar(type) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSidebar({ type }));
  };
}

export function showSnackBar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackBar({message,severity  }));
    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
}

export function closeSnackBar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
  };
}
