import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

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
  users: [],
  friends: [],
  friendRequests: [],
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

    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.request;
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
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateSidebar({ type }));
  };
}

export function showSnackBar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackBar({ message, severity }));
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

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((respone) => {
        console.log(respone);
        dispatch(slice.actions.updateUsers({ users: respone.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((respone) => {
        console.log(respone);
        dispatch(slice.actions.updateFriends({ friends: respone.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const FetchFriendRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/users/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((respone) => {
        console.log(respone);
        dispatch(
          slice.actions.updateFriendRequests({ request: respone.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
