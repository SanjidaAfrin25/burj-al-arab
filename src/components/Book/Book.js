import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from 'react-bootstrap/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';


const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn:new Date(),
        checkOut:new Date()
    });

  const handleCheckIn = (date) => {
      const newDates={...selectedDate}
      newDates.checkIn=date;
    setSelectedDate(newDates);
  };

    const handleCheckOut = (date) => {
    const newDates={...selectedDate}
    newDates.checkOut=date;
    setSelectedDate(newDates);
};
const handleBooking=()=>{
    const newBooking={...loggedInUser,...selectedDate};
    fetch('http://localhost:5000/addBooking',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(newBooking)

    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
    })
}
    const {bedType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h3>hi!{loggedInUser.name}</h3>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check in date"
          value={selectedDate.checkIn}
          onChange={handleCheckIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Check out date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOut}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
      <Button onClick={handleBooking} variant="primary">Book now</Button>
    </MuiPickersUtilsProvider>
    <Bookings></Bookings>
        </div>
    );
};

export default Book;