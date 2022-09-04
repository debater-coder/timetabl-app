import CustomError from "./CustomError";

export default class HTTPError extends CustomError {
  constructor(error_code) {
    super(`HTTP Error: ${error_code}`);
    this.error_code = error_code;
  }
}
