"use client";
import { useContext, createContext, useState } from "react";

// create context.
const GlobalMessageContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [unReadCount, setUnReadCount] = useState(0);
  return (
    <GlobalMessageContext.Provider value={{ unReadCount, setUnReadCount }}>
      {children}
    </GlobalMessageContext.Provider>
  );
};

// creating custom hook for accessing context variables.
export const useMessageContext = () => {
  return useContext(GlobalMessageContext);
};
