import LanguageRoute from "./Languages/LanguageRoute";
import CoresRoute from "./Cores/CoresRoute";
import ItemstRoute from "./Items/ItemstRoute";
import ProjectRoute from "./Project/ProjectRoute";
import UserRoute from "./User/UserRoute";

import Reducers from "./reducer";
//export default [...CoresRoute, ...ProjectRoute, ...UserRoute, ...LanguageRoute, ...ItemstRoute];

export default [
    ...CoresRoute,
    ...ItemstRoute,
    ...LanguageRoute,
    ...ProjectRoute,
    ...UserRoute,
    ...Reducers
];
