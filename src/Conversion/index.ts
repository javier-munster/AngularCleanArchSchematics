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

interface ConversionOptions {
    name: string;
    feature: string;
    flat?: boolean;
}

export function conversion(options: ConversionOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        flat: options.flat ?? false,
    };

    const folder = opts.flat ? '' : `/${opts.name}Conversion`;
    const targetPath = normalize(`src/app/${opts.feature}/Data/Implementations/Conversions${folder}`);

    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
        }),
        move(targetPath),
    ]);

    return chain([mergeWith(templateSource)]);
}

