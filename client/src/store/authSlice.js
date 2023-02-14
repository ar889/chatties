import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const signup = createAsyncThunk("user/signup", async (data) => {
  const res = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/auth/signup`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
    withCredentials: true,
  });
  return res.data;
});

export const login = createAsyncThunk("user/login", async (data) => {
  const res = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/auth/login`,
    data: data,
    withCredentials: true,
  });
  if(res.data.login){
  }
  return res.data;
});
export const isUser = createAsyncThunk("user/success", async () => {
  const res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/auth/success`,
    withCredentials: true,
  });
  return res.data;
});
export const logout = createAsyncThunk("user/logout", async () => {
  const res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/auth/logout`,
    withCredentials: true,
  });
  console.log(res.data)
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
