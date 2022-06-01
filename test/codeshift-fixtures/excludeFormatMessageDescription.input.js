import { inject as service } from '@ember/service';

export default class extends Component {
  @service
  intl;

	constructor() {
		let message = this.intl.formatMessage({
      defaultMessage: 'This some message',
      description: 'the description of already existing formatMessage',
		});
	}
}
