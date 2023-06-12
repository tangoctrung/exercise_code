import React from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { Button } from "@mui/material";

function CardCilinic() {
  return (
    <div className='cilinics-item'>
        <div className='image-cilinics'>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/000/417/844/small_2x/healthcare-doctor.jpg" alt="" />
        </div>
        <div className='info-cilinics'>
          <p>Head Quater</p>
          <div className="info-cilinics-phone">
            <p> <PhoneIcon style={{ color: "#4caf50", fontSize: "18px", marginRight: '8px'}} /> +84387195947</p>
            <p> <MarkAsUnreadIcon style={{ color: "#2196f3", fontSize: "18px", marginRight: '8px'}} /> cilinic.contact@gmail.com</p>
          </div>
          <div className="info-cilinics-location">
            <EditLocationIcon style={{ color: "#e91e63", fontSize: "24px", marginRight: '8px'}} /> <span>Ngõ 1 Phạm Văn Đồng, Cầu Giấy, Hà Nội</span>
          </div>

          <div className="info-cilinics-button">
            <Button variant="outlined" style={{ borderColor: "#4caf50", borderRadius: "100px", width: "100%", color: "#4caf50" }}>Contact</Button>
          </div>
        </div>
    </div>
  );
}

export default CardCilinic;
