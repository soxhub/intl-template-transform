import { inject as service } from '@ember/service';
import TestAuthenticator from 'ember-simple-auth/authenticators/test';

@classic
export default class extends TestAuthenticator {
  @service
  intl;

  constructor() {
    super(...arguments);
    let message = this.intl.formatMessage({
      defaultMessage: 'Message to translate',
    });
  }
}