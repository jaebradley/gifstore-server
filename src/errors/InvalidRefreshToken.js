export default class InvalidRefreshToken extends Error {
  constructor(userId) {
    super();

    this.userId = userId;
    this.message = `User: ${userId} has an invalid refresh token`;
  }
}
