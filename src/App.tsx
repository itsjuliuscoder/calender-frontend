import React from 'react';
import { Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import { FaCalendarAlt } from "react-icons/fa";
import axios from 'axios';

export default function App() {
  return (
    <div className="App">      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:email/:token" element={<Events />} />
      </Routes>
    </div>

  );
}

const Home = () => {

  function callGoogle() {
    window.location.href = 'https://julius-calendar-backend-api.herokuapp.com/google';
    //window.open('http://localhost:5000/google', '_blank');
  }

  return (
    <div className="">
      <h1>Calendar Application <FaCalendarAlt /></h1>
      <div className="rowWidth">
          
      </div>
      <button onClick={ () => callGoogle() } className="btnView">View Events</button>
    </div>
  );
};

const Events = () => {

  const params = useParams();

  const [ events, setEvent ] = useState<any[]>([]);

  function getEvents(){
    const token = params.token;
    axios
    .get(`https://www.googleapis.com/calendar/v3/calendars/${params.email}/events`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 50000,
    })
    .then((response) => {
      setEvent(response.data.items);
    })
    .catch((ex) => {
      console.log(ex);
    });
  } 

  useEffect(() => {
    getEvents();
  }); 
  return (
    <div>
      <h1>Calendar Events</h1>
      {events && events.length > 0 && 
        <>
          {events.map((event, index) => (
            <div className='row'>
                <h1 key={index}>{event.summary}</h1>
                <p key={index}>{event.summary}</p>
            </div>
          )) }
        </>
      }
    </div>
  );
};

