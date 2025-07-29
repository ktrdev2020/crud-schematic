"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crud = crud;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function crud(options) {
    const modelFields = options.model.split(',').map((pair) => {
        const [key, type] = pair.split(':');
        return { key: key.trim(), type: type.trim() };
    });
    return (tree, context) => {
        const tmpl = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)(Object.assign(Object.assign(Object.assign({}, core_1.strings), options), { modelFields })),
            (0, schematics_1.renameTemplateFiles)(), // ✅ แปลงไฟล์ .ts.template → .ts และ .html.template → .html
            (0, schematics_1.move)('src/app/' + core_1.strings.dasherize(options.name))
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(tmpl)]);
    };
}
