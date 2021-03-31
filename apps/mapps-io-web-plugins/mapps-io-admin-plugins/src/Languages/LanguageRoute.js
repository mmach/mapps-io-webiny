import Dictionary from "./Dictionary/index.js";
import LanguageToProject from "./LanguageToProject/index.js";

export default [
    {
        type: "mapps-admin-route",
        name: "route-mapps-languages-list",
        component: LanguageToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-languages-dictionaries",
        component: Dictionary
    }
];
