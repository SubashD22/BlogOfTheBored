import axios from "axios";

const getPost = async()=>{
    const response = await axios.get('http://localhost:5000/api/posts');
    return response.data
    
}
const getsinglePost = async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/post/${id}`);
    return response.data
}

const postService = {
    getPost,
    getsinglePost
}
export default postService