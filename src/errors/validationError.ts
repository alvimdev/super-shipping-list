import AppError from "./appError";

export default class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
