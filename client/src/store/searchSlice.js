import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const search = createAsyncThunk("user/search", async (data) => {
  const res = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/search/hit`,
    data: data,
    withCredentials: true,
  });
  console.log(res.data)
  return res.data;
});




export const searchSlice = createSlice({
    name: "search",
    initialState: {
      data: {},
      visible:false
    },
    reducers: {
        set: (state,action) => {
        state.data.success=false
      }},
    extraReducers: (builder) => {
      builder.addCase(search.fulfilled, (state, action) => {
        state.data = action.payload;
      });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { set } = searchSlice.actions

  export default searchSlice.reducer;
  