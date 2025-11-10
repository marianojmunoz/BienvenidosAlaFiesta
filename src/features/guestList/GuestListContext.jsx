import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const GuestListContext = createContext();

export const useGuestList = () => useContext(GuestListContext);

// Sample data - in a real application, this would come from your state management or API
const initialGuests = [];

export const GuestListProvider = ({ children }) => {
  const [guests, setGuests] = useState(initialGuests);

  const totalGuests = useMemo(() => {
    return guests.reduce((total, guest) => total + guest.qty, 0);
  }, [guests]);

  const addGuest = useCallback(() => {
    const newGuest = {
      id: Date.now(), // Simple unique ID generation
      name: 'Nuevo Invitado',
      qty: 1,
      hasChildren: 1,
      observations: '',
      table: 0,
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
    addGuest,
    deleteGuest,
    handleGuestChange,
  }), [guests, totalGuests, addGuest, deleteGuest, handleGuestChange]);

  return (
    <GuestListContext.Provider value={value}>
      {children}
    </GuestListContext.Provider>
  );
};
