"use client";

import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
// import EventProvider from "@/contexts/EventProviderWrapper";



import Hero from "@/components/Hero";
import EventList from "@/components/Events/EventList";
import UpcomingEvents from "@/components/UpcomingEvents";
import RecommendedEvents from "@/components/RecommendedEvents";
import DownloadApp from "@/components/DownloadApp";
// import { EventContext } from "../contexts/EventContext";

const Home = () => {
  const { showEventList } = useContext(EventContext);

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
          <UpcomingEvents />
          {/* download app section */}
          <DownloadApp />
          {/* reccomended events slider */}
          <RecommendedEvents />
        </div>
      )}

      {/* </EventProvider> */}
    </div>
  );
};

export default Home;
