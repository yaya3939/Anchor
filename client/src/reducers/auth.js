import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(userInfo);
    try {
      const res = await axios.post("/api/user/register", body, config);
      return res.data;
    } catch (err) {
      dispatch(logoutUser());
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userInfo, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(userInfo);

      const res = await axios.post("/api/user/login", body, config);
      return res.data;
    } catch (err) {
      dispatch(logoutUser());
      return rejectWithValue(err.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUserInfo",
  async (arg, { rejectWithValue, dispatch }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/user");
      return res.data;
    } catch (err) {
      dispatch(logoutUser());
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    load: true,
    authenticated: false,
    user: null,
  },
  reducers: {
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        load: false,
        authenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        return {
          ...state,
          load: false,
          authenticated: true,
          user: action.payload,
        };
      })
      .addMatcher(
        (action) => action.type.endsWith("User/fulfilled"),
        (state, action) => {
          localStorage.setItem("token", action.payload.token);
          return {
            ...state,
            ...action.payload,
            load: false,
            authenticated: true,
          };
        }
      );
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
