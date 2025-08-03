"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crud = crud;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function crud(options) {
    return (tree, context) => {
        if (!options.name) {
            throw new Error('❌ Missing required option: name');
        }
        const name = options.name;
        const dasherizedName = core_1.strings.dasherize(name);
        const classifiedName = core_1.strings.classify(name);
        const targetPath = `src/app/${dasherizedName}`;
        context.logger.info(`🚀 Starting schematic for: ${name}`);
        context.logger.info(`📦 Output path: ${targetPath}`);
        context.logger.info(`📁 Template path: ./files`);
        context.logger.info(`🛠 Classify: ${classifiedName}`);
        context.logger.info(`🔤 Dasherize: ${dasherizedName}`);
        const tmpl = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { dasherize_name: core_1.strings.dasherize(options.name), classify_name: core_1.strings.classify(options.name) })),
            (0, schematics_1.renameTemplateFiles)(), // ✅ เปลี่ยนชื่อไฟล์ .template → ไฟล์จริง
            (0, schematics_1.move)(targetPath)
        ]);
        return (0, schematics_1.chain)([
            (0, schematics_1.mergeWith)(tmpl, schematics_1.MergeStrategy.Overwrite)
        ]);
    };
}
