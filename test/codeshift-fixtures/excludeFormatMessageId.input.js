import { inject as service } from '@ember/service';

export default class extends Component {
  @service
  intl;

	constructor() {
		let message = this.intl.formatMessage({
		  id: 'some.resource.translation.id'
    });
	}
}
