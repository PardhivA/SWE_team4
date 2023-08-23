import React, { createContext, useContext, useState } from "react";

const CntContext = createContext();

export const useCnt = () => {
  return useContext(CntContext);
};

export const CntProvider = ({ children }) => {
  const [cnt, setCnt] = useState(0);

  const incrementCnt = () => {
    setCnt(cnt + 1);
  };

  return (
    <CntContext.Provider value={{ cnt, incrementCnt }}>
      {children}
    </CntContext.Provider>
  );
};
