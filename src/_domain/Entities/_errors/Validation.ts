export class ValidationError extends Error {
  constructor(feedback: string) {
    super(feedback)
    Object.setPrototypeOf(this, ValidationError.prototype)
    this.name = 'ValidationError'
  }
}
