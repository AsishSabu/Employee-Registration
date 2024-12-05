import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  errors: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(state);

      state.users.push(action.payload);
    },
    setCurrent: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    updateUser: (state, action) => {
      console.log(state.users, "state");
      if (!state.currentUser) {
        return;
      }
      const index = state.users.findIndex(
        (user) => user.email === state.currentUser.email
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        state.currentUser = state.users[index];
      } else {
        console.error("User not found in the users list");
      }
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  },
});

export const {
  addUser,
  setCurrent,
  logoutUser,
  updateUser,
  setErrors,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
