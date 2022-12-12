import axios from "axios"
import { useQuery, useQueryClient } from "react-query"

const fetchData = ({queryKey}) =>{
    const Id = queryKey[1]
    return axios.get(`http://localhost:5000/api/post/${Id}`)
};

export const useSinglePostData = (Id) =>{
    const queryClient = useQueryClient()
    return useQuery(['single-post', Id],fetchData,{
        initialData:()=>{

        const post = queryClient.getQueryData('allpost')?.data?.find(
         (post)=>post._id === parseInt(Id)
        )
    if(post){
        return{
            data:post
        }
    }else{
        return undefined
    }}
    })
}