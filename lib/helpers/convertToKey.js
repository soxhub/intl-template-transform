module.exports = function convertToKey(text) {
  return text?.toString().replace(/[^a-zA-Z0-9{}@]/g, '_').replace(/@/g, '').replace(/{/g, '').replace(/}/g, '').replace(/this_/g, '').replace(/_+/g, '_').replace(/_$/, '').replace(/get_?/g, '') ?? '';
}
