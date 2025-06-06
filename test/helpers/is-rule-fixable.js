import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function isRuleFixable(ruleName) {
  const relativePath = `../../lib/rules/${ruleName}.js`;
  const pathRule = path.resolve(__dirname, relativePath);
  let rule = fs.readFileSync(pathRule, { encoding: 'utf8' });

  let ast = parse(rule, { sourceType: 'module' });

  let isFixable = false;

  // the usage here depends on the running environment...
  // which means @babel/traverse is compiled incorrectly...
  //
  // Errors on Node 18 without the '.default'
  ('default' in traverse ? traverse.default : traverse)(ast, {
    ObjectProperty(path) {
      if (
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'isFixable' &&
        !(path.node.value.type === 'BooleanLiteral' && path.node.value.value === false)
      ) {
        isFixable = true;
      }
    },
  });

  return isFixable;
}
