import Component from '@glimmer/component';

export default class InterestingComponent extends Component {
  someLabel = '';

  constructor(){
    super(...arguments);

    this.someLabel = 'Nice Label';
  }
}
