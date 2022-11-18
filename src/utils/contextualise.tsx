import React, { createContext, useContext } from "react";

/**
 * 'Globalises' a hook by wrapping it in a context provider.
 */
export default <T,>(
  hook: () => T,
  defaultValue?: T
): [() => T, (props: T) => JSX.Element] => {
  const Context = createContext(defaultValue);

  const Provider = withProps(Context.Provider, hook());

  return [() => useContext(Context), Provider];
};

/** Composes several providers or wrappers into a single wrapper.
 *
 *  Credit to: https://stackoverflow.com/questions/51504506/too-many-react-context-providers
 */
export const Compose = ({
  components = [],
  children,
}: {
  components: React.JSXElementConstructor<{ children: React.ReactNode }>[];
  children: React.ReactNode;
}) => (
  <>
    {components.reduceRight(
      (
        acc,
        Comp: React.JSXElementConstructor<{ children: React.ReactNode }>
      ) => {
        return <Comp>{acc}</Comp>;
      },
      children
    )}
  </>
);

export const withProps = <P,>(
  Component: (arg0: unknown) => React.ReactElement,
  addedProps: P
) => {
  return (props: P) => <Component {...props} {...addedProps} />;
};
