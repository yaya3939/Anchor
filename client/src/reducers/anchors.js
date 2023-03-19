import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    try {
      await axios.delete(`/api/anchors/${anchorId}`);
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

//---- /anchors/:id
//get anchor by anchorId
export const getAnchorById = createAsyncThunk(
  "anchors/getIdAnchor",
  async (anchorId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/anchors/${anchorId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//update anchor info
export const updateAnchor = createAsyncThunk(
  "anchors/updateAnchor",
  async ({ anchorInfo, anchorId }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(anchorInfo);
    try {
      await axios.put(`/api/anchors/${anchorId}`, body, config);
      await dispatch(getAnchorById(anchorId));
      dispatch(getAnchors());
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//delete record
export const deleteRecord = createAsyncThunk(
  "anchors/deleteRecord",
  async ({ anchorId, recordId }, { rejectWithValue, dispatch }) => {
    if (
      window.confirm(
        "You're deleting today's record. You can add a new record for today later."
      )
    ) {
      try {
        await axios.delete(`/api/anchors/record/${anchorId}/${recordId}`);
        await dispatch(getAnchorById(anchorId));
        await dispatch(getAnchors());
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

//update record text
export const updateRecord = createAsyncThunk(
  "anchors/updateRecord",
  async ({ text, anchorId, recordId }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(
        `/api/anchors/record/${anchorId}/${recordId}`,
        text,
        config
      );
      await dispatch(getAnchorById(anchorId));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const anchorSlice = createSlice({
  name: "anchors",
  initialState: {
    anchor: null,
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
      .addCase(getAnchorById.fulfilled, (state, action) => {
        return {
          ...state,
          anchor: action.payload,
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
