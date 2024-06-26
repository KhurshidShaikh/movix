import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";


const Carousel = ({datares,loading,endpoint,title}) => {
   const carouselContainer=useRef();
   const {url}=useSelector(state=>state.home)
   const navigate=useNavigate();

  const navigation=(dir)=>{
     const container=carouselContainer.current;
      
     const scrollAmount=dir==="left"
     ?container.scrollLeft-(container.offsetWidth+20):container.scrollLeft+(container.offsetWidth+20)

     container.scrollTo({
      left:scrollAmount,
      behavior:"smooth"
     })


  };

  const skitem=()=>{
    return(
      <div className="skeletonItem">
        <div className="posterBlock skeleton">

          </div>
          <div className="textBlock">
            <span className="title skeleton"></span>
            <span className="date skeleton"></span>

        </div>
      </div>
    )
  }
   
  return (
    <div className="carousel">
        <ContentWrapper>
          {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation("left")}/>
        <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>navigation("right")}/>
       { !loading?( <div className="carouselItems" ref={carouselContainer}>
         {datares?.map((item)=>{
            const postersrc=item.poster_path?url.poster+item.poster_path:PosterFallback;
          
         return(
            <div className="carouselItem" key={item.id} onClick={()=>navigate(`/${item.media_type ||endpoint}/${item.id}`)}>
                <div className="posterBlock">
                <Img  src={postersrc}/>
                <CircleRating rating={item.vote_average.toFixed(1)}/>
                <Genres data={item.genre_ids.slice(0,2)}/>

                </div>
                <div className="textBlock">
                  <span className="title">{item.title||item.name}</span>
                  <span className="date">{dayjs(item.release_Date).format("MMM D, YYYY")}</span>
                </div>
          </div>
         );

         })}
        </div>):(
        <div className="loadingSkeleton">
         {skitem()}
         {skitem()}
         {skitem()}
         {skitem()}
        </div>
      
      
      )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel
