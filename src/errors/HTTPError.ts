import CustomError from "./CustomError";

export default class HTTPError extends CustomError {
  error_code: string;

  constructor(error_code: string) {
    super(`HTTP Error: ${error_code}`);
    this.error_code = error_code;
  }
}
