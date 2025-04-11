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

interface UseCaseOptions {
    name: string;
    feature: string;
    flat?: boolean;
}

export function repository(options: UseCaseOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        flat: options.flat ?? false,
    }

    const folder = opts.flat ? '' : `/${opts.name}`;
    const domainPath = normalize(`src/app/${opts.feature}/Domain/Repositories`);
    const implPath = normalize(`src/app/${opts.feature}/Data/Implementations${folder}`);

    return chain([
        mergeWith(apply(url('./files/Domain'), [
            applyTemplates({
                ...strings,
                ...opts,
            }),
            move(domainPath),
        ])),
        mergeWith(apply(url('./files/Data'), [
            applyTemplates({
                ...strings,
                ...opts,
            }),
            move(normalize(implPath)),
        ])),
    ]);
}
