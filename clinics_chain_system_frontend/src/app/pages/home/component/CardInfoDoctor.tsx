import React from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Button } from '@mui/material';

function CardInfoDoctor() {
  return (
    <div className='askDoctos-item'>
      <div className='item-top'>
        <div className='img'>
          <img src="https://is4-ssl.mzstatic.com/image/thumb/Purple126/v4/1e/cc/fe/1eccfe7d-a9e0-d469-1ebb-bdb8c33c67c7/source/256x256bb.jpg" alt="" />
        </div>
        <div className='item-top-text'>
          <p>dr. Jena Joe</p>
          <span>Pediatric Surgeon</span>
        </div>
      </div>
      <div className='item-bottom'>
        <div className='item-bottom-like'>
          <ThumbUpIcon />
          <span>95</span>
        </div>
        <div className='item-bottom-like'>
          <LocalMallIcon />
          <span>4 years</span>
        </div>
        <div className='item-bottom-chat'>
          <Button variant='contained' style={{backgroundColor: 'rgb(46,125,50)', borderRadius: "30px", width: '100px'}} >CHAT</Button>
        </div>
      </div>
    </div>
  );
}

export default CardInfoDoctor;
