import { Rule } from '@angular-devkit/schematics';
interface EntityOptions {
    name: string;
    feature: string;
    flat?: boolean;
}
export declare function entity(options: EntityOptions): Rule;
export {};
