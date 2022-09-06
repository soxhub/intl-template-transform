import { pluralize } from 'ember-inflector';
import Component from '@ember/component';

export default Component.extend({
  init() {
    const a = pluralize('Task');
    const b = pluralize(this.count, 'Task');
    const c = pluralize(this.count, 'Task', { withoutCount: true });
    const d = `My name is Stan. I have got nice ${pluralize(
      this.count,
      'Task',
      {
        withoutCount: true,
      }
    )}.`;
  },
});
