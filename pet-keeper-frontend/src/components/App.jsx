import React from "react";
import Header from "./Header";
import Grid from '@mui/material/Grid';
import Controller from "./Controller";
import Chart from "./Chart";
import Today from "./Today";
import DHT11Table from "./DHT11";
import "../index.css"
import Stream from "./Stream";
function App(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={2} className="custom-controller">
                <div style={{display:'flex',flexDirection:'column'}}>  
                    <div>
                        <Controller />
                    </div>
                    <div style={{marginTop:'50%'}}>
                        <Today />
                    </div>
                    
                </div>
            </Grid>
            <Grid  item xs={10}>
                <div style={{display:'flex',flexWrap:'wrap'}}>
                    <div style={{width:'60%',justifyContent:'flex-start'}}>
                        <div style={{width:'90%'}}>
                            <Chart />
                        </div>
                        <div style={{width:'80%',marginTop:'20px',marginLeft:'50px'}}>
                            <DHT11Table/>
                        </div>
                    </div>
                    <div style={{width:'40%',marginTop:'100px'}}>
                        <Stream/>
                    </div>
                </div>
            </Grid>


        </Grid>
    );
}

export default App;