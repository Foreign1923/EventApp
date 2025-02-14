"use client";

import React from "react";
import { useState, useEffect } from "react";

const Timer = ({ event }) => {
  //   console.log(eventDate);
  // calculate the target event date and time
  const eventDate = new Date(`${event.date}T${event.hour}`);

  //state to track the remaining time in miliseconds
  const [timeRemaining, setTimeRemaining] = useState(eventDate - new Date());

  //handle the countdown timer logic
  useEffect(() => {
    //set up on interval that update every second
    const interval = setInterval(() => {
      const now = new Date(); // get current time
      const timeleft = eventDate - now; //calculate the remaining time

      //if the time is up, clear the interval and stop the countdown
      if (timeleft <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(timeleft); // update the remaining time state
      }
    }, 1000); // runs every 1000 miliseconds (1second);
    // cleanup function to clear the interval when the component unmount
    return () => clearInterval(interval);
  }, [eventDate]); // dependency array ensures the effect runs only when 'eventDate' changes
  //changes

  // console.log(timeRemaining);
  //if the countdown has ended, display a message
  if (timeRemaining <= 0) {
    return <div>The event has already passed!</div>;
  }
  //calculate the remaining days, hours, minutes and seconds from 'timeRemaing'
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 *60 *60)
); //remaining hours in the current day

const  minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) /(1000 * 60));
// console.log(hours);
//remaining minutes in the hour
// console.log(minutes);
const seconds = Math.floor((timeRemaining % (100 *60)) / 1000); //reamining seconds
 // in the current minute



  return (
    <div className="flex flex-wrap gap-4">
        {/* days */}
        <div>
            <div className="text-center border-[3px] 
            border-accent rounded-full w-[100px] 
            h-[100px] flex items-center justify-center" >
                <div className="text-3xl font-semibold">{days}</div>
                <div className="text-sm uppercase font-medium">Days</div>
            </div>
        </div>
        {/* hours */}
        <div>
            <div className="text-center border-[3px] 
            border-accent rounded-full w-[100px] 
            h-[100px] flex items-center justify-center" >
                <div className="text-3xl font-semibold">{hours}</div>
                <div className="text-sm uppercase font-medium">Hours</div>
            </div>
        </div>
        {/* seconds */}
        <div>
            <div className="text-center border-[3px] 
            border-accent rounded-full w-[100px] 
            h-[100px] flex items-center justify-center" >
                <div className="text-3xl font-semibold">{seconds}</div>
                <div className="text-sm uppercase font-medium">Seconds</div>
            </div>
        </div>
    </div>
  );
};

export default Timer;
