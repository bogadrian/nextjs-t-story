export class ServerError extends Error {
  super(message: string) {
    this.message = message;
    this.name = 'Server Error';
  }
}
