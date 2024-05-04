import React from 'react'
import Carousel from"../../../components/carousel/Carousel"
import useFetch from '../../../hooks/useFetch'
const Similar = ({mediaType, id}) => {

const {data,loading}=useFetch(`/${mediaType}/${id}/similar`)
const title=mediaType==="movie"?"Similar Movies":"Similar Tv Shows"
  return (
    <div>
  <Carousel 
  title={title}
  datares={data?.results}
  loading={loading}
  endpoint={mediaType}/>
    </div>
  )
}

export default Similar
