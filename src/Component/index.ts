import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    url,
    filter,
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

interface ComponentOptions {
    name: string;
    feature: string;
    style?: 'css' | 'scss';
}

export function component(options: ComponentOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        style: options.style ?? 'scss'
    };

    const targetPath = normalize(`src/app/${opts.feature}/Presentation/${opts.name}Component`);

    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
            styleExt: opts.style,
        }),
        filter(path => {
            // Filter out the file for the style not being used
            return path.endsWith(`.${opts.style}`) || !path.match(/\.css$|\.scss$/);
        }),
        move(targetPath),
    ]);

    return chain([mergeWith(templateSource)]);
}

