import Login from "./Login/render.js";
import UserRegister from "./UserRegister/render.js";
import UserInfo from "./UserShowInfo/render.js";
import UserRedirectActions from "./UserRedirectActions/render.js";
import UserEditableActions from "./UserEditableActions/render.js";
import SetLocalisation from "./SetLocalisation/render.js";
import UserShowUserInitActions from "./UserShowInitActions/render.js";

export default [
    ...UserInfo,
    ...Login,
    ...UserRegister,
    ...UserRedirectActions,
    ...UserEditableActions,
    ...SetLocalisation,
    ...UserShowUserInitActions
];
