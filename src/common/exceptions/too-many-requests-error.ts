export class TooManyRequestsError extends Error {
  public details?: any;

  constructor(message = 'Too Many Requests', details?: any) {
    super(message);
    this.name = 'TooManyRequestsError';
    this.details = details;
  }
}
