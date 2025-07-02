import AppError from "./appError";

export default class AuthError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}