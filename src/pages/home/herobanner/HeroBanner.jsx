import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
 const[background,setBackground]=useState("");
 const[query,setQuery]=useState("");
 const navigate=useNavigate();
 const {data,loading}=useFetch("/movie/upcoming");
 const {url}=useSelector(state=>state.home)

 useEffect(()=>{
  const bg=url.backdrop+data?.results?.[Math.floor(Math.random()*20)].backdrop_path;
  setBackground(bg);


 },[data])

 const searchQueryHandler=(event)=>{
  if(event.key==="Enter" && query.length>0){
    navigate(`/search/${query}`)

  }

 }

  return (
    <div className="heroBanner">
     {
      !loading &&<div className="backdropimg">
     <Img src={background}/>
   </div>
     } 
     <div className="opacity-layer"></div>

   <ContentWrapper>

       <div className="content">
        <span className="title">Welcome</span>
        <span className="subtitle">Millions of movies, TV shows and people to discover.
        Explore now
        </span>

        <div className="searchinput">
          <input type="text"  placeholder='search for a movie or tv show..'
           onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
          <button>Search</button>
        </div>
       </div>

       </ContentWrapper>
       </div>
  )
}

export default HeroBanner
