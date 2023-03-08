import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//----- /
//get all user's anchors
export const getAnchors = createAsyncThunk(
  "anchors/getAllAnchor",
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
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//add record to anchor
export const addRecord = createAsyncThunk(
  "anchors/addRecordForAnchor",
  async ({ record, anchorId }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(record);
    try {
      await axios.put(`/api/anchors/record/${anchorId}`, body, config);
      await dispatch(getAnchors());
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      .addMatcher(
        (action) => action.type.endsWith("Anchor/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default anchorSlice.reducer;
