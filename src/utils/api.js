import axios from "axios";
const BASE_URL='https://api.themoviedb.org/3';
const TMDB_Token=import.meta.env.VITE_APP_TMDB_TOKEN;

const headers={
    Authorization: " Bearer "+ TMDB_Token 
};

export const fetchDataFromApi=async(url,params)=>{
try {
    const {data}= await axios.get(BASE_URL+url,{
        headers:headers,
        params:params,
    });

    return data; 
    
} catch (error) {
    throw error;
}
}
