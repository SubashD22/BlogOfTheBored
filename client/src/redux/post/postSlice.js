import{createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import postService from './postService';

const initialState ={
    posts:[],
    singlePost:null,
    postsError:false,
    postsSuccess:false,
    postsLoading:false,
    postsMessage:''
}

export const getPost = createAsyncThunk('posts/get',
async(_,thunkAPI)=>{
    try{
       return await postService.getPost()
    }catch(error){
        const message = (error.response &&
            error.response.data &&
             error.response.data.message) 
              ||error.message||error.toString();
        return thunkAPI.rejectWithValue(message); 
    }
});
export const getsinglePost = createAsyncThunk('posts/getsinglePost',
async(id,thunkAPI)=>{
    try{
       return await postService.getsinglePost(id)
    }catch(error){
        const message = (error.response &&
            error.response.data &&
             error.response.data.message) 
              ||error.message||error.toString();
        return thunkAPI.rejectWithValue(message); 
    }
})

export const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        postreset:(state)=> initialState
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getPost.pending,(state)=>{
            state.postsLoading = true
        })
        .addCase(getPost.fulfilled,(state,action)=>{
            state.postsLoading = false
            state.postsSuccess = true
            state.posts = action.payload
        })
        .addCase(getPost.rejected,(state,action)=>{
            state.postsLoading = false
            state.postsError = true
            state.postsMessage = action.payload
        })
        .addCase(getsinglePost.pending,(state)=>{
            state.postsLoading = true
        })
        .addCase(getsinglePost.fulfilled,(state,action)=>{
            state.postsLoading = false
            state.postsSuccess = true
            state.singlePost = action.payload
        })
        .addCase(getsinglePost.rejected,(state,action)=>{
            state.postsLoading = false
            state.postsError = true
            state.postsMessage = action.payload
        })
    }
});

export const {postreset} = postSlice.actions;
export default postSlice.reducer;  