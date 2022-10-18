import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
import postsreducer from '../redux/post/postSlice';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        postStore: postsreducer
    }
});