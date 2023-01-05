import React, { createContext, useContext } from "react";

/**
 * 'Globalises' a hook by wrapping it in a context provider.
 */
export default <TData, TParameters extends unknown[]>(
  hook: (...args: TParameters) => TData,
  defaultValue?: TData
): [() => TData, (props: { children: React.ReactNode }) => JSX.Element] => {
  const Context = createContext(defaultValue);
  const Provider = ({
    children,
    initialArgs,
  }: {
    children: React.ReactNode;
    initialArgs: TParameters;
  }) => (
    <Context.Provider value={hook(...initialArgs)}>{children}</Context.Provider>
  );
  return [() => useContext(Context), Provider];
};

/** Composes several providers or wrappers into a single wrapper.
 *
 *  Credit to: https://stackoverflow.com/questions/51504506/too-many-react-context-providers
 */
export function Compose(props: {
  components: Array<
    React.JSXElementConstructor<React.PropsWithChildren<unknown>>
  >;
  children: React.ReactNode;
}) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}

/**
 * Create a new component which adds props to an existing component.
 */
export function withProps(
  Component: React.JSXElementConstructor<React.PropsWithChildren<unknown>>,
  addedProps: Record<string, unknown>
) {
  return (props: Record<string, unknown>) => (
    <Component {...addedProps} {...props} />
  );
}
