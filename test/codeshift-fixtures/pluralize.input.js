import { pluralize } from 'ember-inflector';
import Component from '@ember/component';

export default Component.extend({
  init() {
    const a = pluralize('Task');
    const b = pluralize('Task', this.count);
    const c = pluralize('Task', this.count, { withoutCount: true });
    const d = `My name is Stan. I have got nice ${pluralize(
      'Task',
      this.count,
      {
        withoutCount: true,
      }
    )}.`;
  },
});
