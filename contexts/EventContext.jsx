"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventList, setShowEventList] = useState(false);

  //current filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  //apllied filters (after submit)
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    selectedLocation: "",
    selectedDate: null,
    selectedType,
  });

  //filtered events based on the applied filters
  const filteredEvents = useMemo(() => {
    // if (!events || events.length === 0) return []; // Eğer veri gelmemişse boş dizi dön
    const today = new Date();
    return events.filter((event) => {
      //check event date (exclude past events)
      const eventDate = new Date(event.date);
      if (eventDate < today) return false;
      //check search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      const matchesLocation = appliedFilters.selectedLocation
        ? event.location.toLowerCase() ===
          appliedFilters.selectedLocation.toLowerCase()
        : true;

      //check date
      const matchesDate = appliedFilters.selectedDate
        ? eventDate.toDateString() ===
          new Date(appliedFilters.selectedDate).toDateString()
        : true;

      //check type
      const matchesType = appliedFilters.selectedType
        ? event.type.toLowerCase() === appliedFilters.selectedType.toLowerCase()
        : true;

      return matchesSearch && matchesLocation && matchesDate && matchesType;
    });

    //check location
  }, [events, appliedFilters]);

  // fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      //start loader
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/events"); //
        if (!res.ok) {
          throw new Error("Faieled to fetch events");
        }
        const data = await res.json();
        setEvents(data);
        //stop loader;
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        //stop loader
        setIsLoading(false);
      }
      // finally{
      //   setIsLoading(false);
      // }
    };
    fetchEvents();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    setShowEventList(true);
    setAppliedFilters({
      searchTerm,
      selectedLocation,
      selectedDate,
      selectedType,
    });
    // console.log(events);
    setTimeout(() => {
      setIsLoading(false);
      // console.log(events);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowEventList(false);
    setSelectedLocation("");
    setSelectedDate(null);
    setSelectedType("");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filteredEvents,
        handleSubmit,
        handleClearSearch,
        showEventList,
        selectedLocation,
        setSelectedLocation,
        selectedDate,
        setSelectedDate,
        selectedType,
        setSelectedType,
        // setShowEventList,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
