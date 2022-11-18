import React, { createContext, useContext } from "react";

/**
 * 'Globalises' a hook by wrapping it in a context provider.
 */
export default <T,>(
  hook: () => T,
  defaultValue?: T
): [() => T, (props: T) => JSX.Element] => {
  const Context = createContext(defaultValue);

  const Provider = withProps(Context.Provider, { value: hook() });

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
  return () => <Component {...addedProps} />;
}
