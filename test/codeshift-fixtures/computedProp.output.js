import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  intl: service('intl'),

  message: computed(function () {
    return this.intl.formatMessage('Nice Message');
  }),

  message2: computed(function () {
    return [
      this.intl.formatMessage('Message')
    ];
  }),

  message2_2: computed(function () {
    return {
      message: this.intl.formatMessage('Message')
    };
  }),

  message3() {
    return this.intl.formatMessage('Message');
  },

  message4: function () {
    return this.intl.formatMessage('Message');
  },

  message5: () => {
    return this.intl.formatMessage('Message');
  },

  message6: task(function* () {
    return this.intl.formatMessage('Message');
  }),

  message7: computed(function* () {
    return this.intl.formatMessage('Message');
  }),
});
