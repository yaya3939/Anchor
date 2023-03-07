import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setAlert } from "./alert";

//----- /
//get all user's anchors
export const getAnchors = createAsyncThunk(
  "anchors/getAnchors",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/anchors");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//create a new anchor
export const createAnchor = createAsyncThunk(
  "anchors/createAnchor",
  async (anchorInfo, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(anchorInfo);
    try {
      await axios.post("/api/anchors", body, config);
      await dispatch(getAnchors());
      dispatch(setAlert("New anchor added", "succedd"));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//add record to anchor

//---- /anchors
//get anchor by anchorId

//update anchor info

//update record text

//delete record

//delete anchor

const anchorSlice = createSlice({
  name: "anchors",
  initialState: {
    anchor: {},
    anchors: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAnchors.fulfilled, (state, action) => {
        state.anchors = action.payload;
        state.loading = false;
      })
      .addCase(getAnchors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default anchorSlice.reducer;
