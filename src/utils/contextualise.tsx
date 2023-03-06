import React, { createContext, useContext } from "react";

/**
 * 'Globalises' a hook by wrapping it in a context provider.
 */
export default <TData, TParameters extends unknown[]>(
  hook: () => TData,
  defaultValue?: TData
): [() => TData, (props: { children: React.ReactNode }) => JSX.Element] => {
  const Context = createContext(defaultValue);
  const Provider = ({
    children,
  }: {
    children: React.ReactNode;
    initialArgs: TParameters;
  }) => <Context.Provider value={hook()}>{children}</Context.Provider>;
  return [() => useContext(Context), Provider];
};
