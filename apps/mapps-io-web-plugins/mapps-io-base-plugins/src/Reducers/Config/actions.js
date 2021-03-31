import { QueryList } from "justshare-shared";
import ActionsGen from "../../App/actions";

const CONFIG_ACTIONS = {
    GET_LANGUAGES_FETCH: ActionsGen(QueryList.Languages.GET_LANGUAGES),
    GET_ACTIONS_FETCH: ActionsGen(QueryList.Actions.GET_ACTIONS),
    GET_ROLES_FETCH: ActionsGen(QueryList.Roles.GET_ROLES),
    GET_PRIVS_FETCH: ActionsGen(QueryList.Privileges.GET_PRIVS),
    GET_USER_TYPES_FETCH: ActionsGen(QueryList.User.GET_USER_TYPES),
    GET_PROJECT_INFO_FETCH: ActionsGen(QueryList.Project.GET_PROJECT_INFO),
    GET_DIM_FETCH: ActionsGen(QueryList.Dimensions.GET_DIM),
    GET_STATUS_FETCH: ActionsGen(QueryList.Status.GET_STATUS),
    GET_PROCESS_FETCH: ActionsGen(QueryList.Process.GET_PROCESS),

    SET_PRIVS_CONST: "SET_PRIVS_CONST"
};
export default CONFIG_ACTIONS;
