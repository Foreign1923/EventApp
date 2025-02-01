"use client";

import EventList from "@/components/Events/EventList";
import Hero from "@/components/Hero";
// import EventProvider from "@/contexts/EventProviderWrapper";
import { EventContext } from "@/contexts/EventContext";

import React, { useContext } from "react";
// import { EventContext } from "../contexts/EventContext";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);

  return (
    <div>
      <Hero />
      {/* <EventProvider> */}
      {/* <EventSearch />    */}
      <div className="flex flex-col jc-center items-center">
      </div>

      {showEventList ? (
        <div className="container mx-auto ">
          <EventList />
        </div>
      ) : (
        <div>
          <div className="container mx-auto"></div>
          {/* upcoming events slider */}
          <div> Upcoming Events Slider </div>
          {/* download app section */}
          <div> Download App Section </div>
          {/* reccomended events slider */}
          <div> Recommended Events Slider </div>
        </div>
      )}

      {/* </EventProvider> */}
    </div>
  );
};

export default Home;
