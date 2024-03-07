import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect } from "react";
import axios from "axios";

function Today() {
    let currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      
      const monthNumber = currentDate.getMonth();
      const month = months[monthNumber];
      const day = currentDate.getDay();
      const year = currentDate.getFullYear();
      const fullYear = month+" "+day+","+year;
      
    const [time, setTime] = React.useState(currentTime);
    const [data,setData] = React.useState({});
    
    useEffect(()=>{
       
        function getTime() {
            setTime(new Date().toLocaleTimeString());
        }
        setInterval(getTime, 1000);

        axios.get("http://localhost:8000/data/weather")
        .then(response=>{
            setData(response.data);
        })
        .catch(err=>{
            console.log(err);
        });
    },[])

  return (
    <div style={{borderTop:'1px solid rgba(0, 0, 0, 0.12)'}}>
        <Card sx={{ width: "100%"}}>
          <CardHeader
            title={time}
            subheader={fullYear}
          />
          <CardMedia
            component="img"
            height="132"
            image={data.imgURL}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Weather today: {data.description}
            </Typography>
          </CardContent>

        </Card>
    </div>
   
  );
}

export default Today;