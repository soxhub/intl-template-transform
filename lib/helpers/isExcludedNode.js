//function return tru if node is excluded from searching translations
module.exports = function isExcludedNode(node) {
    let isAuditboardIcon = (node.tag === 'i' && node.attributes.find(a => a.name === 'class' && a.value?.chars?.indexOf('auditboard-icons') !== -1));
    let isMaterialIcon = (node.tag === 'i' && node.attributes.find(a => a.name === 'class' && a.value?.chars?.indexOf('material-icons') !== -1));
    let isSpanClearFix = (node.tag === 'span' && node.attributes.find(a => a.name === 'class' && a.value?.chars?.indexOf('clearfix') !== -1));
    return (isAuditboardIcon || isMaterialIcon || isSpanClearFix);
}