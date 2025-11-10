import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const GuestListContext = createContext();

export const useGuestList = () => useContext(GuestListContext);

// Sample data - in a real application, this would come from your state management or API
const initialGuests = [];

export const GuestListProvider = ({ children }) => {
  const [guests, setGuests] = useState(initialGuests);

  const totalAdults = useMemo(() => {
    return guests.reduce((total, guest) => total + Number(guest.adults), 0);
  }, [guests]);

  const totalChildren = useMemo(() => {
    return guests.reduce((total, guest) => total + Number(guest.hasChildren), 0);
  }, [guests]);

  const totalGuests = totalAdults + totalChildren;

  const addGuest = useCallback(() => {
    const newGuest = {
      id: Date.now(), // Simple unique ID generation
      name: 'Nuevo Invitado',
      qty: 1,
      adults: 1,
      hasChildren: 0,
      observations: '',
      table: 1,
      type: 'Friend',
      isHere: false,
    };
    setGuests(currentGuests => [...currentGuests, newGuest]);
  }, []);

  const deleteGuest = useCallback((id) => {
    setGuests(currentGuests =>
      currentGuests.filter(guest => guest.id !== id)
    );
  }, []);

  const handleGuestChange = useCallback((id, field, value) => {
    setGuests(currentGuests =>
      currentGuests.map(guest =>
        guest.id === id ? { ...guest, [field]: value } : guest
      )
    );
  }, []);

  const value = useMemo(() => ({
    guests,
    totalGuests,
    totalAdults,
    totalChildren,
    addGuest,
    deleteGuest,
    handleGuestChange,
  }), [guests, totalGuests, totalAdults, totalChildren, addGuest, deleteGuest, handleGuestChange]);

  return (
    <GuestListContext.Provider value={value}>
      {children}
    </GuestListContext.Provider>
  );
};
