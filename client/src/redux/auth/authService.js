import axios from 'axios';


const register = async (userData) => {
    const response = await axios.post("http://localhost:5000/api/register",userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    };

    return response.data
};
const login = async (userData) => {
    const response = await axios.post("http://localhost:5000/api/login",userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    };

    return response.data
}


const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
};
export default authService