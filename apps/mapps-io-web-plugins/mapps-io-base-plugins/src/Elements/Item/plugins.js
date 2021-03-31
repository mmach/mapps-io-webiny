import { SearchItemMapPlugins } from "./SearchItemMap/plugin";
import { SearchItemListPlugins } from "./SearchItemList/plugin";
import { SearchItemFilterPlugins } from "./SearchItemFilterPanel/plugin";

export const ItemPlugins = [
    ...SearchItemMapPlugins,
    ...SearchItemListPlugins,
    ...SearchItemFilterPlugins
];
