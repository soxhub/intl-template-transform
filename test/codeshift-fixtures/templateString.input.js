export default class extends Component {
  c = 1;
  d = 2;
	constructor() {
		super();

		let a = 1;
		let b = 2;
		let message = `This ${a} is ${b} nice. ${this.c + this.d}`;
	}
}