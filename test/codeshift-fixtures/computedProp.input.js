import Component from '@ember/component';

export default Component.extend({
  message: "Nice Message",

  message2: [
    "Message"
  ],

  message2_2: {
    message: "Message"
  },

  message3() {
    return "Message";
  },

  message4: function () {
    return "Message";
  },

  message5: () => {
    return "Message";
  },

  message6: task(function* () {
    return "Message";
  }),

  message7: computed(function* () {
    return "Message";
  })
});