export const log = (...args: unknown[]) => {
  if (localStorage.getItem("debug") === "true") {
    // eslint-disable-next-line no-console
    return console.log(...args);
  }
};
