import ActionsNew from "./Actions/ActionsNew/index.js";
import ActionsPrivilegesToProject from "./Actions/ActionsPrivilegesToProject/ActionsPrivilegesToProject.js";
import ActionsStatuses from "./Actions/ActionsStatuses/index.js";
import ActionsToProject from "./Actions/ActionsToProject/index.js";
import CategoryOptions from "./Categories/categoryOptions.js";
import Categories from "./Categories/index.js";
import ProcessMenu from "./Processes/processMenu.js";
import PrivilegesAdd from "./Roles_Privs/PrivilegesAdd/index.js";
import PrivilegesToProject from "./Roles_Privs/PrivilegesToProject/index.js";
import RolesAdd from "./Roles_Privs/RolesAdd/index.js";
import RolesToProject from "./Roles_Privs/RolesToProject/index.js";
import Statuses from "./Statuses/index.js";
import StatusGlobal from "./Statuses/StatusGlobal.js";
export default [
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-privs",
        component: ActionsPrivilegesToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-new",
        component: ActionsNew
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-status",
        component: ActionsStatuses
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-action",
        component: ActionsToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-process",
        component: ProcessMenu
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-roles",
        component: RolesToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-roles-add",
        component: RolesAdd
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-privileges",
        component: PrivilegesToProject
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-privileges-add",
        component: PrivilegesAdd
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-status-project",
        component: Statuses
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-status-global",
        component: StatusGlobal
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-categories-cat",
        component: Categories
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-actions-catopt",
        component: CategoryOptions
    }
];
