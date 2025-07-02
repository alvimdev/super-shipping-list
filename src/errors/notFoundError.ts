import AppError from "./appError";

export default class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
