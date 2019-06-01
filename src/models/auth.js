import User from './user';

class Auth {
  akun = null;
  token = null;

  constructor(input) {
    this.akun = input.akun === undefined ? new User({}) : new User(input.akun);
    this.token = input.token === undefined ? '' : input.token;
  }
}

export default Auth;