function appendStyles(options) {
  options = options || {};

  if (!options.css) throw new Error('You need to specify the css to be inserted');
  if (!options.id) throw new Error('You need to specify the id of the style element');
  if (!options.before && !options.after) {
    throw new Error('You need to specify a before or an after id');
  }
  if (options.before && options.after) {
    throw new Error('You can only specify either a before or an after id');
  }

  var styleElement = createStyleElement(options);

  return styleElement;
}

function createStyleElement(options) {
  var css = options.css;
  var id = options.id;

  var styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('data-append-styles', id);

  if (globalThis.__webpack_nonce__) {
    styleElement.nonce = globalThis.__webpack_nonce__;
  }

  var head = document.head

  var target = head.childNodes[0];

  var existing = document.querySelectorAll('[data-append-styles="' + id + '"]');

  if (existing.length > 0) {
    target = existing[existing.length - 1].nextSibling
  } else if (options.before) {
    var before = document.querySelectorAll('[data-append-styles="' + options.before + '"]');
    target = before.length > 0 && before[0] || target;
  } else if (options.after) {
    var after = document.querySelectorAll('[data-append-styles="' + options.after + '"]');
    target = after.length > 0 && after[after.length - 1].nextSibling || target;
  }

  // strip potential UTF-8 BOM if css was read from a file
  if (css.charCodeAt(0) === 0xfeff) {
    css = css.substr(1, css.length);
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    styleElement.textContent = css;
  }

  head.insertBefore(styleElement, target);

  return styleElement;
}

module.exports = appendStyles;
module.exports.appendStyles = appendStyles;
