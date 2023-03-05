import { createSlice, nanoid } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    addAlert: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (msg, alertType) => {
        return { payload: { msg, alertType, id: nanoid() } };
      },
    },
    removeAlert(state, action) {
      state.pop();
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export const setAlert = (msg, alertType) => (dispatch) => {
  dispatch(addAlert(msg, alertType));
  setTimeout(() => {
    dispatch(removeAlert());
  }, 5000);
};

export default alertSlice.reducer;
