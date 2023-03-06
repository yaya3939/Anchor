import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alert";
import authReducer from "./reducers/auth";
import anchorsReducer from "./reducers/anchors";

export default configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
    anchors: anchorsReducer,
  },
});
