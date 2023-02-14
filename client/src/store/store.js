import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './authSlice'
import conversationSlice from './conversationSlice'
import messageSlice from './messageSlice'
import searchSlice from './searchSlice'


export default configureStore({
  reducer: {
    user:userSlice,
    conversation:conversationSlice,
    message:messageSlice,
    search:searchSlice
  },
})