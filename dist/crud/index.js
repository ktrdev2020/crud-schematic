"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crud = crud;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function crud(options) {
    return (tree, context) => {
        const tmpl = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)(Object.assign(Object.assign({}, core_1.strings), options)),
            (0, schematics_1.renameTemplateFiles)(),
            (0, schematics_1.move)('src/app/' + core_1.strings.dasherize(options.name))
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(tmpl)]);
    };
}
