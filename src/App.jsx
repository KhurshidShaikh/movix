import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration ,getGenres} from "./redux/homeSlice";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Header from"./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from"./pages/home/Home"
import Explore from "./pages/explore/Explore"
import SearchResults from "./pages/searchResults/SearchResults";
import Details from "./pages/details/Details"
import PageNotFound from "./pages/404/PageNotFound"



function App() {
  const {url}=useSelector((state)=>state.home)
  const dispatch = useDispatch()


  useEffect(()=>{
   apidata();
   genresCall();
  },[])  
 

  const apidata=()=>{
     fetchDataFromApi("/configuration")
     .then((res)=>{
      
      const url={
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original",

      };


      dispatch(getApiConfiguration(url))
     });
     
    
  };
  const genresCall=async()=>{
    let promises=[];
    let endPoints=["tv","movie"];
    let allGenres={}

    endPoints.forEach((url)=>{
     promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    let data= await Promise.all(promises)
    
    data.map(({genres})=>{
      return genres.map((item)=>{
        (allGenres[item.id]=item)
       })
    })
   dispatch(getGenres(allGenres))
    }

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:mediaType/:id" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchResults/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<PageNotFound/>}/>





    </Routes>
    <Footer/>
    
    
    
    </BrowserRouter>

    </>
  )
}

export default App
