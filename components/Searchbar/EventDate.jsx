"use client";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { BiCalendar, BiChevronDown } from "react-icons/bi";
import { useContext } from "react";
import { PopoverTrigger } from "@radix-ui/react-popover";

import { EventContext } from "@/contexts/EventContext";


const EventDate = () => {
  const { selectedDate, setSelectedDate } = useContext(EventContext);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="flex w-full items-center gap-[10px] xl:w-[190px]">
        <div className="text-lg text-accent">
            <BiCalendar />
        </div>
      <Popover>
        <PopoverTrigger>
          <Button className="w-full justify-start p-0 bg-transparent hover:bg-transparent">
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-secondary border-0 text-white">
            <Calendar 
            mode="single" 
            selected={selectedDate} 
            onSelect={handleDateChange}
            initialFocus
            />
        </PopoverContent>
        <div className="text-[26px]">
            {/* <BiCalendar /> */}
            <BiChevronDown />
        </div>
      </Popover>
    </div>
  );
};

export default EventDate;
