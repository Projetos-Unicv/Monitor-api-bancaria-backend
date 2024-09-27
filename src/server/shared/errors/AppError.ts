export class AppError extends Error {
  public readonly statusCode: number;
  public readonly error: any;

  constructor(message: string, statusCode = 400, error?: any) {
    super(message); // Chama o construtor da classe Error
    this.statusCode = statusCode;
    this.error = error;

    // Captura o stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
