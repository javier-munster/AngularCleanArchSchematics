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
    isAsync: boolean;
}

export function entity(options: EntityOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        async: (options.isAsync ?? true) ? 'Async' : '',
    };

    const targetPath = normalize(`src/app/${opts.feature}/Domain/Entities`);

    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
        }),
        move(targetPath),
    ]);

    return chain([mergeWith(templateSource)]);
}

