"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crud = crud;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function crud(options) {
    return (tree, context) => {
        // ✅ Log name + dasherize
        const name = options.name;
        const dasherizedName = core_1.strings.dasherize(name);
        const targetPath = `src/app/${dasherizedName}`;
        context.logger.info(`🚀 Starting schematic for: ${name}`);
        context.logger.info(`📦 Output path: ${targetPath}`);
        context.logger.info(`📁 Template path: ./files`);
        context.logger.info(`🛠 Classify: ${core_1.strings.classify(name)}`);
        context.logger.info(`🔤 Dasherize: ${dasherizedName}`);
        const tmpl = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)(Object.assign(Object.assign({}, core_1.strings), options)),
            (0, schematics_1.renameTemplateFiles)(),
            (0, schematics_1.move)(targetPath)
        ]);
        return (0, schematics_1.chain)([
            (0, schematics_1.mergeWith)(tmpl, schematics_1.MergeStrategy.Overwrite) // ✅ บังคับ overwrite เพื่อเคลียร์ cache เก่า
        ]);
    };
}
