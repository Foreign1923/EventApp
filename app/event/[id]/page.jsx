"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";

//components
import EventSchedule from "@/components/EventSchedule";
import Timer from "@/components/Timer";
import CustomSelect from "@/components/CustomSelect";
import BuyTicket from "@/components/BuyTicket";

import { FaRegCircleCheck } from "react-icons/fa6";
import Organizers from "@/components/Organizers";


// const EventDetails = async ({ params }) => {
//   const { id } = await params;

//   //fetch event based on the id
//   const fetchEvent = async (id) => {
//     const res = await fetch(`http://localhost:4000/events/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch event");
//     return res.json();
//   };
//   const event = await fetchEvent(id);
const EventDetails = ({ params }) => {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        const res = await fetch(`http://localhost:4000/events/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch event: ${res.status}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params]);
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <section className="min-h-screen flex items-center py-8 sm:py-48">
      <div className="container mx-auto">
        <div className="w-full max-w-[600px] xl:max-w-none mx-auto">
          {/* event details 1 */}
          <div
            className="flex flex-col gap-8 xl:gap-24 xl:flex-row 
            pt-28 pb-12 sm:py-0 xl:mb-24"
          >
            {/* image */}
            <div
              className="relative w-full h-[320px] xl:max-w-[678px] xl:h-[500px]
            rounded-2xl overflow-hidden mb-12 xl:mb-0"
            >
              <Image
                src={event.img_lg}
                fill
                className="object-cover mix-blend-lighten"
                alt=""
              />
            </div>
            {/* info */}
            <div
              className="flex w-full max-w-[460px] 
            flex-col justify-center gap-8 flex-1 sm:mb-12 xl:mb-0"
            >
              <div>
                <h2 className="h2 mb-4">{event.title}</h2>
                <EventSchedule event={event} />
              </div>
              <Timer event ={event} />
              <CustomSelect event= {event} />
              <BuyTicket event={event} />
            </div>
          </div>
          {/* event details 2 */}
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-24">
            {/* text */}
            <div className="w-full xl:max-w-[670px] flex flex-col gap-8 xl:gap-12">
              <p className="text-grey ">{event.description}</p>
              <div>
                <h3 className="h3 mb-6">Requirements for the event</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-grey">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Omnis consequatur in assumenda inventore molestias tenetur
                      voluptas! Nihil sapiente deleniti reprehenderit ducimus
                      odio sit? Laudantium ea repudiandae sed minus nesciunt
                      omnis.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-grey">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Omnis consequatur in assumenda inventore molestias tenetur
                      voluptas! Nihil sapiente deleniti reprehenderit ducimus
                      odio sit? Laudantium ea repudiandae sed minus nesciunt
                      omnis.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-grey">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Omnis consequatur in assumenda inventore molestias tenetur
                      voluptas! Nihil sapiente deleniti reprehenderit ducimus
                      odio sit? Laudantium ea repudiandae sed minus nesciunt
                      omnis.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-grey">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Omnis consequatur in assumenda inventore molestias tenetur
                      voluptas! Nihil sapiente deleniti reprehenderit ducimus
                      odio sit? Laudantium ea repudiandae sed minus nesciunt
                      omnis.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            {/* organizers */}
            <div className="w-full max-w-[460px]">
              <Organizers event={ event } />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
