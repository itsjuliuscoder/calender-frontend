import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { FaCalendarAlt } from "react-icons/fa";
import axios from 'axios';

function App() {

  const [ events, setEvent ] = useState<any[]>([]);

  // useEffect(() => {
  //   axios
  //   .get('https://julius-calendar-backend-api.herokuapp.com/google')
  //   .then((response) => {
  //     if(response && response.data){
  //       console.log("response", response.data.items);
  //       setEvent(response.data.items); 
  //     } else {
  //       console.log("no response");
  //     }        
      
  //   })
  //   .catch((ex) => {
  //     let error = axios.isCancel(ex)
  //       ? 'Request Cancelled'
  //       : ex.code === 'ECONNABORTED'
  //       ? 'A timeout has occurred'
  //       : ex.response.status === 404
  //       ? 'Resource Not Found'
  //       : 'An unexpected error has occurred';
  //     console.log("This is an error....");
  //   });
    
  // }, []);

  function callGoogle() {
    window.location.href = 'https://julius-calendar-backend-api.herokuapp.com/google';
    //window.open('http://localhost:5000/google', '_blank');
  }

  function getEvents(){
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    if(token && email){
      axios
      .get(`https://www.googleapis.com/calendar/v3/calendars/${email}/events`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })
      .then((response) => {
        if(response){
          console.log("response", response.data);
          setEvent(response.data.items); 
        } else {
          console.log("no response");
        }              
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log("No token and email");
    }
  }
  
  useEffect(() => {
    getEvents();
  }, []); 
  
  return (
    <div className="App">
      <h1>Calendar Application <FaCalendarAlt /></h1>
      <button onClick={ () => callGoogle() } className="btnView">View Events</button>
      <div>
        {events && events.length > 0 && 
          <>
            {events.map((event, index) => (

              <h1 key={index}>{event.summary}</h1>
            )) }
          </>
        }
      </div>
    </div>
  );
}

export default App;
