import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@mui/material';
import "../index.css"
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';
import { format } from 'date-fns';

function Chart() {
  const [data, setData] = useState([]);
  const db = database;
  const beatRef = ref(db, 'sensor');
  useEffect(() => {
    function getTime() {
      return format(new Date(), 'HH:mm:ss');
    }
    const fetchData = () => {
      onValue(beatRef, (snapshot) => {
        const newBeat = snapshot.val();
        const currentTime = getTime();
        if (data.length === 0 || currentTime !== data[data.length - 1].time) {
          const newData = {
            time: currentTime,
            heartBeat: newBeat.heartBeat
          };
          setData((prevData) => {
            const filteredData = prevData.filter((item) => item.time !== newData.time);
            return [...filteredData, newData];
          });
        }
      });
    };
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [beatRef,data]);

  return (
    <div style={{paddingRight: '20px'}}>
      <div style={{marginLeft:'63px' }}>
        <Button variant="contained" onClick={() => setData([])}>Xóa Dữ Liệu</Button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line  dataKey="heartBeat" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Chart;

