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

interface DataSourceOptions {
    name: string;
    feature: string;
    flat?: boolean;
}

export function dataSource(options: DataSourceOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        flat: options.flat ?? false,
    }

    const folder = opts.flat ? '' : `/${opts.name}`;
    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
        }),
        move(normalize(`src/app/${opts.feature}/Data/DataSources/${folder}`)),
    ]);

    return chain([mergeWith(templateSource)]);
}

