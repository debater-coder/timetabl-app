import CustomError from "./CustomError";

export class UnauthorizedError extends CustomError {
  constructor() {
    super("Unauthorized");
  }
}
