"use client";

import React, { useContext } from "react";

import { EventContext } from "@/contexts/EventContext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { BiMap } from "react-icons/bi";

const EventLocation = () => {
  const { events, selectedLocation, setSelectedLocation } =
    useContext(EventContext);

  //generate a lis of unique locations
  //use set to remove duplicate locations
  const uniqueLocations = [
    "All locations", //default option to display all locations
    ...new Set(
      events
        .filter((event) => {
          const eventDate = new Date(event.date); // convert event date to Date object
          const currentDate = new Date(); //get the current date

          //include events that accour after the current date
          if (eventDate > currentDate) {
            return true;
          }

          // include events happening today but only if the time has not yet passed
          if (eventDate.toDateString() === currentDate.toDateString()) {
            // return eventDate.getHours() >= currentDate.getHours();
            const eventTime = eventDate.getTime(); //get the time in milliseconds
            const currentTime = currentDate.getTime(); // get current time in milliseconds
            return eventTime >= currentTime; // include event if it's still upcoming today
          }
          return false; // exclude events happening today if the time has already passed
        })
        .map((event) => event.location) // extract the location of each event
    ),
  ];

  //Array.from(new Set(events.map((event) => event.location)));
  return (
    <div
      className="flex items-center gap-[10px] w-full 
    xl:w-[190px] select-none "
    >
      {/* Icon */}
      <div className="text-lg text-accent">
        <BiMap />
      </div>
      <Select
        value={selectedLocation}
        onValueChange={(value) => setSelectedLocation(value)}
      >
        <SelectTrigger
          className="bg-transparent border-none 
        focus:ring-0 focus:ring-offset-0 text-left p-0"
        >
          <SelectValue placeholder="Event Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Location</SelectLabel>
            {uniqueLocations.map((location, index) => {
              return (
                <SelectItem
                  value={location === "All locations" ? null : location}
                  key={index}
                >
                  {location}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventLocation;
