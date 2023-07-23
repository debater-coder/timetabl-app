export const log = (...args: unknown[]) => {
  if (localStorage.getItem("debug") === "true") {
    return console.log(...args);
  }
};
