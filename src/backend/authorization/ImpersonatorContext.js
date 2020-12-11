import React, { useState, createContext } from "react";

export const ImpersonatorContext = createContext();

export const ImpersonatorProvider = (props) => {
  const [impersonator, setImpersonator] = useState(null);

  return (
    <ImpersonatorContext.Provider value={[impersonator, setImpersonator]}>
        {props.children}
    </ImpersonatorContext.Provider>
  );
};