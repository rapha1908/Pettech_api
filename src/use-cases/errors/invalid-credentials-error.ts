export class InvalidCredentialsError extends Error {
  constructor() {
    super('User or password invalid')
  }
}
