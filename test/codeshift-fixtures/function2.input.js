import { helper } from '@ember/component/helper';

export default helper(function (intl, params) {
  const fn = () => {
    const bytes = params[0];
    const decimals = params[1];

    if (bytes === 0) {
      return '0 Bytes';
    }
  };
});