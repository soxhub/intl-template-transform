import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class InterestingComponent extends Component {
  @service
  intl;

  someLabel = '';

  constructor(){
 super(...arguments);

 this.someLabel = this.intl.formatMessage({
   defaultMessage: 'Nice Label',
 });
  }
}
