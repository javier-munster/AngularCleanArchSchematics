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

interface DataTransferObjectOptions {
    name: string;
    feature: string;
    flat?: boolean;
}

export function dataTransferObject(options: DataTransferObjectOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        flat: options.flat ?? false,
    }

    const folder = opts.flat ? '' : `/${opts.name}DTO`;
    const targetPath = normalize(`src/app/${opts.feature}/Data/DTO${folder}`);

    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
        }),
        move(targetPath),
    ]);

    return chain([mergeWith(templateSource)]);
}

