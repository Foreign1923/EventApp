"use client";

import { TicketContext } from "@/contexts/TicketContext";
import React, { useContext, useEffect } from "react";

import { PiChairFill } from "react-icons/pi";
import { BiChevronDown } from "react-icons/bi";

const CustomSelect = ({ event }) => {
  console.log(event);
  const { seat, showMenu, setShowMenu, handleSeat, initializeEvent } =
    useContext(TicketContext);

  //initilize event
  useEffect(() => {
    initializeEvent(event);
  }, []);
  return (
    <div
      onClick={(e) => {setShowMenu((prev) => !prev); // toggle the menu state
        e.stopPropagation(); //prevent event bubling
      }}
      className="custom-select bg-secondary 
    w-full h-[64px] rounded-full items-center justify-between 
    px-8 relative cursor-pointer select-none"
    >
      <div className="flex items-center gap-2 w-full">
        <div className="text-xl text-accent">
          <PiChairFill />
        </div>
        <div className="flex items-center justify-between w-full py-5">
          <div className="flex-1 capitalize">{seat.seat}</div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">${seat.price}</div>
            <div className="text-sm text-white/60">each</div>
          </div>
        </div>
      </div>
      {/* menu */}
      {showMenu && (
        <ul
          className="bg-secondary absolute 
    top-[70px] overflow-hidden w-full rounded-3xl h-[200px]"
        >
          {event.seats.map((seat, index) => (
            <li key={index} 
            className="cursor-pointer hover:bg-white/5 px-8 py-5"
            onClick={(e)=> {handleSeat(seat.seat, seat.price);
              e.stopPropagation();
            }
            }
            >
              <div className="flex justify-between">
                <div className="capitalize">{seat.seat}</div>
                <div>${seat.price}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
