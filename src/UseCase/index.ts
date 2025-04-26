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

export function useCase(options: UseCaseOptions): Rule {
    const opts = {
        name: strings.classify(options.name),
        feature: strings.classify(options.feature),
        flat: options.flat ?? false,
    };

    const folder = opts.flat ? '' : `/${opts.name}UseCase`;
    const templateSource = apply(url('./files'), [
        applyTemplates({
            ...strings,
            ...opts,
        }),
        move(normalize(`src/app/${opts.feature}/Domain/UseCases${folder}`)),
    ]);

    return chain([mergeWith(templateSource)]);
}

