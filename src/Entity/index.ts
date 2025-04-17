import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    url,
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

interface EntityOptions {
    name: string;
    feature: string;
    flat?: boolean;
}

export function entity(options: EntityOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        flat: options.flat ?? false,
    }

    const folder = opts.flat ? '' : `/${opts.name}Entity`;
    const targetPath = normalize(`src/app/${opts.feature}/Domain/Entities${folder}`);

    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
        }),
        move(targetPath),
    ]);

    return chain([mergeWith(templateSource)]);
}

