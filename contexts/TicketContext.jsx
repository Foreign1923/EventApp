"use client";

import React, { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  // state to store the event data
  const [seat, setSeat] = useState({ seat: null, price: null });
  //state to store the selected seat
  const [showMenu, setShowMenu] = useState(true); // state to manage menu visibility
  const [itemAmount, SetItemAmount] = useState(1); // state to track item amount
  //(quantity of items)
  const [totalPrice, setTotalPrice] = useState(0); // state tot store the total price
  const [checkoutData, setCheckoutData] = useState(null); //state to store the checkout
  //data
  const initializeEvent = (fetchedEvent) => {
    setEvent(fetchedEvent);
    //reset item amount when a new event is initialized
    SetItemAmount(1);
    //initialize the "frontseat" if it exist in the fetched event data
    const frontseat = fetchedEvent?.seats.find(
      (seat) => seat.seat === "frontseat"
    );
    if (frontseat) {
      setSeat({ seat: frontseat.seat, price: frontseat.price });
    }
  };

  //effect to handle click outside ıf the menu to close it
//   const handleClickOutside = (e) => {
//     if (!e.target.closest(".custom-select")) {
//       setShowMenu(false);
//     }
//   };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-select")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // calculate total price whenever the seat price or item amount changes
  useEffect(() => {
    setTotalPrice(seat.price * itemAmount);
  }, [seat.price, itemAmount]);

  //function to handle the seat selection
  const handleSeat = (seat, price) => {
    setSeat({ seat, price });
    setShowMenu(false);
  };
  //function to handle "Buy Now"
  const buyNow = (event) => {
    const ticketData = {
      eventId: event.id,
      eventName: event.title,
      ticketType: seat.seat,
      ticketPrice: seat.price,
      amount: itemAmount,
      totalPrice,
    };
    setCheckoutData(ticketData);
    // in case if we want to use the data for the checkout
    //page
  };

  const increaseAmount = () => {
    SetItemAmount((prevAmount) => prevAmount +1);
  };
  const decreaseAmount =() => {
    SetItemAmount((prevAmount) => (prevAmount > 1 ? prevAmount-1 : 1));
    //if prevAmount is bigger than 1 you can decrease otherwise keep it to 1 i
  }


  return (
    <TicketContext.Provider
      value={{
        event,
        seat,
        showMenu,
        itemAmount,
        totalPrice,
        checkoutData,
        handleSeat,
        setSeat,
        setShowMenu,
        buyNow,
        initializeEvent,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};


export default TicketProvider;