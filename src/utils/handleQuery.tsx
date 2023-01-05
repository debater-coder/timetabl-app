export default function handleQuery<TSuccess, TError>(
  data: unknown,
  error: unknown,
  callback: (isLoaded: boolean) => TSuccess,
  onError: TError
) {
  if (data || !error) {
    return callback(!!data);
  }

  return onError;
}
