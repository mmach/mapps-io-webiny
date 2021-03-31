export { MappsPluginsContainer } from "./PluginsContainer";

export type MappsPlugin<T = Record<string, any>> = {
    type: string;
    name?: string;
    init?: () => void;
    [key: string]: any;
} & T;

export type MappsPluginCollection = (MappsPlugin | MappsPluginCollection)[]
