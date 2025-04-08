import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    // SchematicContext,
    // Tree,
    url,
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

interface EntityOptions {
    name: string;
    feature: string;
    flat?: boolean;
}

export function entity(options: EntityOptions): Rule {
    const { name, feature, flat = true } = options;

    const camelizedFeature = strings.camelize(feature);
    const classifiedName = strings.classify(name);
    const folder = flat ? '' : `/${classifiedName}`;

    const targetPath = normalize(
        `src/app/${camelizedFeature}/domain/entities${folder}`
    );

    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...options,
        }),
        move(targetPath),
    ]);

    return chain([mergeWith(templateSource)]);
}

