export default (data, error, callback, onError) => {
  if (data || !error) {
    return callback(!!data);
  }

  return onError();
};
