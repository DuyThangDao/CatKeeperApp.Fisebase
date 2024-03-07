import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import LightModeIcon from '@mui/icons-material/LightMode';
import AirIcon from '@mui/icons-material/Air';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {ref, set,onValue } from "firebase/database";
import { database } from '../firebase';
import Switch from '@mui/material/Switch';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper'
};

function Controller() {
  const [light,setLight] = React.useState();
  const [fan,setFan] = React.useState();
  const [servo, setServo] = React.useState(false);
  const [pump, setPump] = React.useState(false);
  const db = database;
  React.useEffect(()=>{
    onValue(ref(db, 'users/servo'), (snapshot) => {
      const data = snapshot.val();
      if(data.servo_data===1){
        setServo(true)
      }else{
        setServo(false)
      }
    });
    onValue(ref(db, 'users/pump'), (snapshot) => {
      const data = snapshot.val();
      if(data.pump_data===1){
        setPump(true)
      }else{
        setPump(false)
      }
    });
  },[db]);
  function writeFan(fan_data) {
    set(ref(db, 'users/fan'), {
      fan_data: fan_data
    });
  }
  function writeLight(light_data) {
    set(ref(db, 'users/light'), {
      light_data: light_data
    });
  }
  function writeServo(servo_data) {
    set(ref(db, 'users/servo'), {
      servo_data: servo_data
    });
  }
  function writePump(pump_data) {
    set(ref(db, 'users/pump'), {
      pump_data: pump_data
    });
  }
  const handleLight = (event)=>{
    setLight(event.target.value);
    console.log("LIGHT",event.target.value);
    writeLight(event.target.value);
  }
  const handleFan = (event)=>{
    setFan(event.target.value);
    console.log("FAN",event.target.value);
    writeFan(event.target.value);
  }
  const handleServo = (event) => {
    setServo(event.target.checked);
    if(event.target.checked === true){
      writeServo(1);
    }else{
      writeServo(0)
    }
  };
  const handlePump = (event) => {
    setPump(event.target.checked);
    if(event.target.checked === true){
      writePump(1);
    }else{
      writePump(0)
    }
  };
  
      
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem >
        <LightModeIcon/>
        <Box sx={{ width: "50%" }}>
            <Slider
                className='custom-slider'
                value={light}
                min={0}
                max={255}
                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={handleLight}
            />
        </Box>
      </ListItem>
      <Divider />
      <ListItem  divider>
        <AirIcon />
        <Box sx={{ width: "50%" }}>
            <Slider
               className='custom-slider'
                value={fan}
                min={0}
                max={99}
                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={handleFan}
            />
        </Box>
      </ListItem>
      <Divider />
      <ListItem style={{paddingTop:'0px',paddingBottom:'0px',display:'grid',gridTemplateColumns:'1fr 1fr'}}  divider>
        <h5>Food Manual</h5>
        <Box sx={{ width: "50%",display:'flex',justifyContent:'center' }}>
          <Switch
            checked={servo}
            onChange={handleServo}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </ListItem>
      <Divider />
      <ListItem style={{paddingTop:'0px',paddingBottom:'0px',display:'grid',gridTemplateColumns:'1fr 1fr'}}  divider>
        <h5>Water Manual</h5>
        <Box sx={{ width: "50%",display:'flex',justifyContent:'center' }}>
          <Switch
            checked={pump}
            onChange={handlePump}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </ListItem>
    </List>
  );
}

export default Controller;