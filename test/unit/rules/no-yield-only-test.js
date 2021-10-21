'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'no-yield-only',

  config: true,

  good: [
    '{{yield (hash someProp=someValue)}}',
    '{{field}}',
    '{{#yield}}{{/yield}}',
    '<Yield/>',
    '<yield/>',
  ],

  bad: [
    {
      template: '{{yield}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "{{yield}}-only templates are not allowed",
              "rule": "no-yield-only",
              "severity": 2,
              "source": "{{yield}}",
            },
          ]
        `);
      },
    },
    {
      template: '     {{yield}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 5,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "{{yield}}-only templates are not allowed",
              "rule": "no-yield-only",
              "severity": 2,
              "source": "{{yield}}",
            },
          ]
        `);
      },
    },
    {
      template: '\n  {{yield}}\n     ',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 2,
              "filePath": "layout.hbs",
              "line": 2,
              "message": "{{yield}}-only templates are not allowed",
              "rule": "no-yield-only",
              "severity": 2,
              "source": "{{yield}}",
            },
          ]
        `);
      },
    },
  ],
});
