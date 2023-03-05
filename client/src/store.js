import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alert";
import authReducer from "./reducers/auth";

export default configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
  },
});
