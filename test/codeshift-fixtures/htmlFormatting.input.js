/* eslint-disable no-unused-vars */
export default Component.extend({
  init() {
    this._super(...arguments);

    let noFormatting = 'Nice Message';
    let message = "<span>Nice Message</span>";
    let message2 = "<b>Nice Message</b>";
    let message3 = "Nice Message<br />";
    let message4 = "Nice Message<br/>";
    let message5 = "Nice Message<br>";
    let message6 = "<strong>Nice Message</strong>";
  }
});