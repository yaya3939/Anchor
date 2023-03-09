import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//----- /
//get all user's anchors
export const getAnchors = createAsyncThunk(
  "anchors/getAllAnchor",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/anchors");
      const anchors = res.data;
      const today = new Date();
      let pastAnchors = [];
      let futureAnchors = [];
      let nowAnchors = [];
      if (anchors.length > 0) {
        pastAnchors = anchors.filter(
          (anchor) =>
            anchor.to && new Date(anchor.to).getTime() < today.getTime()
        );
        futureAnchors = anchors.filter(
          (anchor) => new Date(anchor.from).getTime() > today.getTime()
        );
        nowAnchors = anchors.filter(
          (anchor) =>
            !pastAnchors.includes(anchor) && !futureAnchors.includes(anchor)
        );
      }
      return { anchors, pastAnchors, futureAnchors, nowAnchors };
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

//delete anchor
export const deleteAnchor = createAsyncThunk(
  "anchors/deleteAnchor",
  async (anchorId, { rejectWithValue, dispatch }) => {
    if (window.confirm("You're deleting this anchor!")) {
      try {
        await axios.delete(`/api/anchors/${anchorId}`);
        await dispatch(getAnchors());
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
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

const anchorSlice = createSlice({
  name: "anchors",
  initialState: {
    anchor: {},
    anchors: [],
    pastAnchors: [],
    futureAnchors: [],
    nowAnchors: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAnchors.fulfilled, (state, action) => {
        return {
          ...state,
          anchors: action.payload.anchors,
          pastAnchors: action.payload.pastAnchors,
          futureAnchors: action.payload.futureAnchors,
          nowAnchors: action.payload.nowAnchors,
          loading: false,
        };
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
