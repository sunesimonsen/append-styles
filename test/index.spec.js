var expect = require('unexpected')
  .clone()
  .use(require('unexpected-dom'))
  .addAssertion(
    '<DOMDocument> to contain styles <array>',
    function(expect, subject, expected) {
      expect(subject.head.childNodes, 'to satisfy', expected);
    }
  );

var appendStyles = require('..');

describe('append-styles', function() {
  it('appends styles in the right order', function() {
    appendStyles({
      css: 'body { background:red; }',
      id: 'module-b',
      after: 'module-a'
    });

    expect(document, 'to contain styles', [
      '<style id="module-b">body { background:red; }</style>'
    ]);

    appendStyles({
      css: 'body { background:blue; }',
      id: 'module-a',
      before: 'module-b'
    });

    expect(document, 'to contain styles', [
      '<style id="module-a">body { background:blue; }</style>',
      '<style id="module-b">body { background:red; }</style>'
    ]);

    appendStyles({
      css: 'h1 { color:papayawhip; }',
      id: 'module-a',
      before: 'module-b'
    });

    expect(document, 'to contain styles', [
      '<style id="module-a">body { background:blue; }h1 { color:papayawhip; }</style>',
      '<style id="module-b">body { background:red; }</style>'
    ]);

    appendStyles({
      css: 'h1 { color:black; }',
      id: 'module-b',
      after: 'module-a'
    });

    expect(document, 'to contain styles', [
      '<style id="module-a">body { background:blue; }h1 { color:papayawhip; }</style>',
      '<style id="module-b">body { background:red; }h1 { color:black; }</style>'
    ]);
  });
});
