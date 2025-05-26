// TimeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30 * 1000); // every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeContext.Provider value={currentTime}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => useContext(TimeContext);
