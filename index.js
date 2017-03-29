var styleElements = {};
var head;

function appendStyles(options) {
  options = options || {};

  var css = options.css;
  var id = options.id;

  if (!css) throw new Error('You need to specify the css to be inserted');
  if (!id) throw new Error('You need to specify the id of the style element');
  if (!options.before && !options.after) {
    throw new Error('You need to specify the id of the style element');
  }

  styleElements[id] = styleElements[id] || createStyleElement(options);
  var styleElement = styleElements[id];

  // strip potential UTF-8 BOM if css was read from a file
  if (css.charCodeAt(0) === 0xfeff) {
    css = css.substr(1, css.length);
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText += css;
  } else {
    styleElement.textContent += css;
  }

  return styleElement;
}

function getElementById(id) {
  return (styleElements[id] = styleElements[id] || document.getElementById(id));
}

function createStyleElement(options) {
  var styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('id', options.id);

  head = head || document.querySelector('head');

  var target = head.childNodes[0];
  var before = options.before && getElementById(options.before);
  var after = options.after && getElementById(options.after);

  target = before || (after && after.nextSibling) || target;

  head.insertBefore(styleElement, target);

  return styleElement;
}

module.exports = appendStyles;
module.exports.appendStyles = appendStyles;
