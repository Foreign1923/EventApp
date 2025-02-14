"use client";

import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const Organizers = ({event}) => {
  return (
    <div>
        <div>
            <h3 className='h3 mb-4'>Orginizers</h3>
            <div className='w-[74px] h-[3px] bg-accent rounded-3xl'></div>
        </div>
        {event.organizers.map((organizer, index)=> {
            return(
                <div key={index} 
                className=''>
                    {/* <Image src={}/> */}
                </div>

            ) 
        })}
    </div>
  )
}

export default Organizers