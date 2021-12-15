import TestAuthenticator from 'ember-simple-auth/authenticators/test';

@classic
export default class extends TestAuthenticator {
  constructor() {
    super(...arguments);
    let message = 'Message to translate';
  }
}