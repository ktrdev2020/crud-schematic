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
  renameTemplateFiles
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

export function crud(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const tmpl = apply(url('./files'), [
      template({
        ...strings,
        ...options
      }),
      renameTemplateFiles(),
      move('src/app/' + strings.dasherize(options.name))
    ]);

    return chain([mergeWith(tmpl)]);
  };
}
