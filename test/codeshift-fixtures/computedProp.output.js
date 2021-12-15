import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	intl: service('intl'),

	message: computed('intl', function () {
		return this.intl.formatMessage({
			defaultMessage: 'Nice Message',
		});
	}),
});