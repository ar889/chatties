import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMessages = createAsyncThunk("user/message", async (id) => {
  const res = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/message/fetch`,
    data:{conversationId:id},
    withCredentials: true,
  });
  return res.data;
});

export const postMessage = createAsyncThunk("user/postMessage", async (data) => {
  const res = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/message/post`,
    data:{
      conversationId:data.conversationId,
      recieverId:data.recieverId,
      message:data.message.message
    },
    withCredentials: true,
  });
  return res.data;
});

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default messageSlice.reducer;
