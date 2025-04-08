"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entity = entity;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function entity(options) {
    const { name, feature, flat = true } = options;
    const camelizedFeature = core_1.strings.camelize(feature);
    const classifiedName = core_1.strings.classify(name);
    const folder = flat ? '' : `/${classifiedName}`;
    const targetPath = (0, core_1.normalize)(`src/app/${camelizedFeature}/domain/entities${folder}`);
    const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.applyTemplates)(Object.assign(Object.assign({}, core_1.strings), options)),
        (0, schematics_1.move)(targetPath),
    ]);
    return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)]);
}
//# sourceMappingURL=index.js.map