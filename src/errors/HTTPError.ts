import CustomError from "./CustomError";

export default class HTTPError extends CustomError {
  error_code: number | string;

  constructor(error_code: number | string) {
    super(`HTTP Error: ${error_code}`);
    this.error_code = error_code;
  }
}
