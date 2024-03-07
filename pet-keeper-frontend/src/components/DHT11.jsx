import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';
function DHT11Table(){
    const [temp,setTemp] = React.useState(0);
    const [humidity,setHumidity] = React.useState(0);
    const db = database;
    const tempRef = ref(db, 'sensor');
    const humidityRef = ref(db, 'sensor');
    React.useEffect(() => {
      onValue(tempRef, (snapshot) => {
        const newTemp = snapshot.val();
        setTemp(newTemp.temperature);
      });
      onValue(humidityRef, (snapshot) => {
        const newHumidity = snapshot.val();
        setHumidity(newHumidity.humidity);
      });
    }, [humidityRef,tempRef]);

    function createData(name, value,unit) {
        return { name, value, unit };
    }
    const rows = [
        createData('Temperature',temp , "(℃)"),
        createData('Humidity', humidity ,"(%)"),
    ];
    return (
        
        <TableContainer style={{height: '200px'}} component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Measuring</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default DHT11Table;