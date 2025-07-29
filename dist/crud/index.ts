import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
  chain,
  renameTemplateFiles // ✅ เพิ่มตัวนี้
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

export function crud(options: any): Rule {
  const modelFields = options.model.split(',').map((pair: string) => {
    const [key, type] = pair.split(':');
    return { key: key.trim(), type: type.trim() };
  });

  return (tree: Tree, context: SchematicContext) => {
    const tmpl = apply(url('./files'), [
      template({
        ...strings,
        ...options,
        modelFields,
      }),
      renameTemplateFiles(), // ✅ แปลงไฟล์ .ts.template → .ts และ .html.template → .html
      move('src/app/' + strings.dasherize(options.name))
    ]);
    return chain([mergeWith(tmpl)]);
  };
}
