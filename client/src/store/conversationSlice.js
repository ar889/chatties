import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const conversation = createAsyncThunk("user/conversation", async () => {
  const res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/conversation/get`,
    withCredentials: true,
  });
  return res.data;
});

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    data: {},
    id:{}
  },
  reducers: {
    recieverData: (state,action) => {
      console.log(action.payload)
    state.id = action.payload
  }
},
  extraReducers: (builder) => {
    builder.addCase(conversation.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { recieverData } = conversationSlice.actions

export default conversationSlice.reducer;
