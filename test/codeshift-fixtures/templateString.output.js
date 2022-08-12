import { inject as service } from '@ember/service';
export default class extends Component {
  @service
  intl;

  c = 1;
  d = 2;
	constructor() {
		super();

		let a = 1;
		let b = 2;
		let message = this.intl.formatMessage({
			defaultMessage: 'This {a} is {b} nice.{a} {cD}',
		}, {
			a: a,
			b: b,
      cD: this.c + this.d,
		});
	}
}
