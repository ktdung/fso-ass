import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  durationInSeconds: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      // return action.payload;
      state.message = action.payload.message;
      state.durationInSeconds = action.payload.durationInSeconds;
    },
    clearNotification: (state) => {
      state.message = null;
      state.durationInSeconds = 0;
    },
  },
});

export const { setNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
