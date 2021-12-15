import { inject as service } from '@ember/service';
/* eslint-disable no-unused-vars */
export default Component.extend({
  intl: service('intl'),

  init() {
    this._super(...arguments);

    let noFormatting = this.intl.formatMessage({
      defaultMessage: 'Nice Message',
    });
    let message = this.intl.formatMessage({
      defaultMessage: '<span>Nice Message</span>',
    });
    let message2 = this.intl.formatMessage({
      defaultMessage: '<b>Nice Message</b>',
    });
    let message3 = this.intl.formatMessage({
      defaultMessage: 'Nice Message<br />',
    });
    let message4 = this.intl.formatMessage({
      defaultMessage: 'Nice Message<br/>',
    });
    let message5 = this.intl.formatMessage({
      defaultMessage: 'Nice Message<br>',
    });
    let message6 = this.intl.formatMessage({
      defaultMessage: '<strong>Nice Message</strong>',
    });
  },
});