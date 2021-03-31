import LanguagesMenu from "./Languages/LanguagesMenu.js";
import CoresMenu from "./Cores/CoresMenu";
import CoresRoute from "./Cores/CoresRoute";
import LanguageRoute from "./Languages/LanguageRoute";
import ProjectsMenu from "./Project/ProjectsMenu";
import ProjectRoute from "./Project/ProjectRoute";
import ItemsMenu from "./Items/ItemsMenu";
import ItemstRoute from "./Items/ItemstRoute";
import UserMenu from "./User/UserMenu";
import UserRoute from "./User/UserRoute";

export default [
    LanguagesMenu,
    CoresMenu,
    ...CoresRoute,
    ...LanguageRoute,
    ProjectsMenu,
    ...ProjectRoute,
    ItemsMenu,
    ...ItemstRoute,
    UserMenu,
    ...UserRoute
];
