import TestAuthenticator from 'ember-simple-auth/authenticators/test';

export default TestAuthenticator.extend({
  init() {
    this._super(...arguments);
    let message = 'Message to translate';
  }
});