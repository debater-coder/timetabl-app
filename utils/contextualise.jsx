import React, { createContext, useContext } from "react";

export default (hook, hookConfig = [], defaultValue) => {
  const Context = createContext(defaultValue);

  const Provider = ({ children }) => (
    <Context.Provider value={hook(...hookConfig)}>{children}</Context.Provider>
  );

  return [() => useContext(Context), Provider];
};

// Credit to: https://stackoverflow.com/questions/51504506/too-many-react-context-providers
export const Compose = ({ components = [], children }) => (
  <>
    {components.reduceRight((acc, Comp) => {
      return <Comp>{acc}</Comp>;
    }, children)}
  </>
);

export const withProps = (Component, addedProps) => {
  return (props) => <Component {...props} {...addedProps} />;
};
