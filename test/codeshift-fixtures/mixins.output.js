import { inject as service } from '@ember/service';
export default Mixin.create({
  intl: service('intl'),
  someFunc(){
    let message = this.intl.formatMessage({
      defaultMessage: 'Nice Message',
    });
  },
});