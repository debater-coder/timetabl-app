export interface FetchWrapper {
  fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}
