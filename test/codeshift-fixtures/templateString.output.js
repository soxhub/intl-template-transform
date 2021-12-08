import { inject as service } from '@ember/service';
export default class extends Component {
	@service
	intl;

	constructor() {
		super();

		let a = 1;
		let b = 2;
		let message = this.intl.formatMessage({
			defaultMessage: 'This {a} is {b} nice.',
		}, {
			a: a,
			b: b,
		});
	}
}