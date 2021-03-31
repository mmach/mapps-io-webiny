import Login from "./Login/index.js";
import UserRegister from "./UserRegister/index.js";
import UserRedirectActions from "./UserRedirectActions/index.js";

import UserInfo from "./UserShowInfo/index.js";

import UserEditableActions from "./UserEditableActions/index.js";
import SetLocalisation from "./SetLocalisation/index.js";

import UserShowUserInitActions from "./UserShowInitActions/index.js";


export default [
    ...UserEditableActions,
    ...UserRedirectActions,
    ...Login,
    ...UserInfo,
    ...UserRegister,
    ...SetLocalisation,
    ...UserShowUserInitActions
    
];
