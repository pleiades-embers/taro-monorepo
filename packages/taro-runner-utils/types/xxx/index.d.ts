interface Option {
    json?: string;
    script?: string;
    wxml?: string;
    path: string;
    rootPath: string;
    framework: 'react' | 'vue';
    isApp?: boolean;
}
export declare function parse(option: Option): Option;
export {};
