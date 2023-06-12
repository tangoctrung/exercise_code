import React from "react";
import { Rating } from '@mui/material';


function CardReview() {
  return (
    <div className='review-item'>
        <p>Curabitur egestas consequat lorem, vel fermentum augue porta id. Aliquam lobortis magna neque, gravida consequat velit venenatis at.</p>
        <Rating name="read-only" value={5} readOnly />
        <div className='info-reviewer'>
        <div className='name-reviewer'>
            <b>Jane Joe</b>
            <i>Chief Digital Officer</i>
        </div>
        <div className='avatar-reviewer'>
            <img src="https://anhdepfree.com/wp-content/uploads/2020/06/hinh-anh-icon-dep.png" alt="" />
        </div>
        </div>
    </div>
  );
}

export default CardReview;
