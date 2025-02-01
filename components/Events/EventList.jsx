"use client";

import React, { useContext } from 'react'

import {EventContext} from "@/contexts/EventContext";
import Event from "./Event";
import SkeletonGrid from '../SkeletonGrid';



const EventList = () => {
  const {filteredEvents, isLoading, error} = useContext(EventContext)
  if (error){
    return <p>Error: {error}</p> //error message
  }
  if (filteredEvents.length === 0 && !isLoading) {
    return(
        <div className='h-[80vh]'>
            <p className='text-white/80 text-center'>No events available</p> 
            {/* no events found */}
        </div>
    );
  }
  if (isLoading){
    return(
        <div>
            <SkeletonGrid itemCount={12} />
        {/* loading message */}
        </div>
        //burayı düzenle bir ara

    );
    }
    else {
        return (
            <div>
                <h4 className='h4 mb-6'>{filteredEvents.length} results found </h4>
                <div className='grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-32'>
                    {filteredEvents.map((event, index) => {
                    return (
                        <div key={index}>
                            {/* {event.title} */}
                            <Event event={event} />
                        </div>
                    );
                })}
                </div>
                
            </div>
        );
    }   
};

export default EventList;