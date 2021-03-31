import SetCategory from "./SetCategory/render.js";
import CreateItem from "./CreateItem/render.js";
import SearchItemFilterPanel from "./SearchItemFilterPanel/render.js";
import SearchItemResultView from "./SearchItemResultView/render.js";
export default [
    ...SetCategory,
    ...CreateItem,
    ...SearchItemFilterPanel,
    
    ...SearchItemResultView
];
