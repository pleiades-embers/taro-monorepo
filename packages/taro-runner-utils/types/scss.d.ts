import { BundleResult } from 'scss-bundle';
export declare function getBundleResult(url: string, projectDirector?: string): Promise<BundleResult>;
export declare function getBundleContent(resource: string | string[], projectDirector?: string): Promise<string | undefined>;
interface LoaderOption {
    data?: string;
    [key: string]: any;
}
interface BuildConfig {
    sass?: {
        resource?: string | string[];
        projectDirectory?: string;
        data?: string;
    };
    sassLoaderOption: LoaderOption;
}
export declare function getSassLoaderOption({ sass, sassLoaderOption }: BuildConfig): Promise<LoaderOption>;
export {};
