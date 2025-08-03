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
    if (!options.name) {
      throw new Error('❌ Missing required option: name');
    }

    const name = options.name;
    const dasherizedName = strings.dasherize(name);
    const classifiedName = strings.classify(name);
    const targetPath = `src/app/${dasherizedName}`;

    context.logger.info(`🚀 Starting schematic for: ${name}`);
    context.logger.info(`📦 Output path: ${targetPath}`);
    context.logger.info(`📁 Template path: ./files`);
    context.logger.info(`🛠 Classify: ${classifiedName}`);
    context.logger.info(`🔤 Dasherize: ${dasherizedName}`);

    const tmpl = apply(url('./files'), [
      template({
        ...strings,
        ...options,
        dasherize_name: strings.dasherize(options.name),
        classify_name: strings.classify(options.name),
      }),
      renameTemplateFiles(), // ✅ เปลี่ยนชื่อไฟล์ .template → ไฟล์จริง
      move(targetPath)
    ]);

    return chain([
      mergeWith(tmpl, MergeStrategy.Overwrite)
    ]);
  };
}
