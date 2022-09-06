import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';
import Component from '@ember/component';

export default Component.extend({
  intl: service('intl'),
  init() {
    const a = this.intl.formatMessage({
      defaultMessage: 'Tasks',
    });

    const b = this.intl.formatMessage({
        defaultMessage: '{count, plural, =0 {no Tasks} =1 {# Task} other {# Tasks}}',
    }, {
        count: this.count,
    });

    const c = this.intl.formatMessage({
        defaultMessage: '{count, plural, =0 {Tasks} =1 {Task} other {Tasks}}',
    }, {
        count: this.count,
    });

    const d = this.intl.formatMessage({
        defaultMessage: 'My name is Stan. I have got nice {count, plural, =0 {Tasks} =1 {Task} other {Tasks}}.',
    }, {
        count: this.count,
    });
  },
});
