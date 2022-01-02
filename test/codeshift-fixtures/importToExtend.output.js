import { inject as service } from '@ember/service';
import TestAuthenticator from 'ember-simple-auth/authenticators/test';

export default TestAuthenticator.extend({
  intl: service('intl'),

  init() {
    this._super(...arguments);
    let message = this.intl.formatMessage({
      defaultMessage: 'Message to translate',
    });
  },
});