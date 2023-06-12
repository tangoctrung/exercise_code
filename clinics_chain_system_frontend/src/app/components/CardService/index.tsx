import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function CardService() {
  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="190"
          image="https://top10vietnam.top/wp-content/uploads/2021/10/Tong-hop-10-cong-ty-thiet-ke-logo-dep-uy-tin-chat-luong-tai-Ha-Noi-9.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Khám mắt
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardService;
