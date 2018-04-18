interface NodeRequire {
    <T>(path: string): T;
}

interface NodeModule {
    hot: any;
}

type KeyValuePairs<TValue> = { [key: string]: TValue };
type QueryParams = {
    dictionarySmoothing?: string;
    word2Vec?: string;
};

declare var module: NodeModule;
declare module '*.png';
declare var require: NodeRequire;
declare var __DEV__: boolean;
