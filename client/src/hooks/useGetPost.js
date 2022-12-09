import axios from "axios"
import { useQuery } from "react-query"

export const useGetPostsData = ()=>{
    return useQuery('posts',()=>{
        return axios.get('http://localhost:5000/api/posts')
    })
}