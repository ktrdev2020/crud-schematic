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
  renameTemplateFiles,
  MergeStrategy
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';

export function crud(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // ✅ Log name + dasherize
    const name = options.name;
    const dasherizedName = strings.dasherize(name);
    const targetPath = `src/app/${dasherizedName}`;
    const templateFile = `./files/${dasherizedName}`;

    context.logger.info(`🚀 Starting schematic for: ${name}`);
    context.logger.info(`📦 Output path: ${targetPath}`);
    context.logger.info(`📁 Template path: ./files`);
    context.logger.info(`🛠 Classify: ${strings.classify(name)}`);
    context.logger.info(`🔤 Dasherize: ${dasherizedName}`);

    const tmpl = apply(url('./files'), [
      template({
        ...strings,
        ...options
      }),
      renameTemplateFiles(),
      move(targetPath)
    ]);

    return chain([
      mergeWith(tmpl, MergeStrategy.Overwrite) // ✅ บังคับ overwrite เพื่อเคลียร์ cache เก่า
    ]);
  };
}
