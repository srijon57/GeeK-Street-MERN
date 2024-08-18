import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa';
import './RatingStar.css'

const RatingStar = (noOfStar = 5) => {
    const[rating,setRating]=useState(null);
    const[hover,setHover]=useState(null);

  return (
    <div className='RatingStar'>
      {[...Array(5)].map((star,index)=>{
        const currentRating=index +1;
    return(
        <label>
            <input
             type="radio"
             name="rating"
             value={currentRating}
             onClick={() => setRating(currentRating)}
            />
            <FaStar className='star' 
            size={50}
            color={currentRating<= (hover || rating) ? "#ffc107" :"#e4e5e9"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}

            />
        </label>
    )

      })}
      <p>Your rating is {rating}</p>
    </div>
  )
}

export default RatingStar
