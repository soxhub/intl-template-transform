import { inject as service } from '@ember/service';
/* eslint-disable no-unused-vars */
export default Component.extend({
  intl: service('intl'),

  init() {
    this._super(...arguments);

    let noFormatting = this.intl.formatMessage('Nice Message');
    let message = this.intl.formatMessage('<span>Nice Message</span>');
    let message2 = this.intl.formatMessage('<b>Nice Message</b>');
    let message3 = this.intl.formatMessage('Nice Message<br />');
    let message4 = this.intl.formatMessage('Nice Message<br/>');
    let message5 = this.intl.formatMessage('Nice Message<br>');
    let message6 = this.intl.formatMessage('<strong>Nice Message</strong>');
  },
});
