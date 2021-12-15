module.exports = function convertToKey(text) {
  return text?.toString().replace(/[^a-zA-Z0-9{}@]/g, '_').replace(/@/g, '').replace('{', '').replace('}', '').replace('this_', '').replace(/_+/g, '_').replace(/_$/, '').replace(/get_?/g, '') ?? '';
}
