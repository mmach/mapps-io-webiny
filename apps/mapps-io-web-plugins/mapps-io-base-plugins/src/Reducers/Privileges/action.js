import { CommandList } from "justshare-shared";
import ActionsGen from "../../App/actions";


const PRIVILEGE_ACTIONS = {
    IS_AUTH: "IS_AUTH",
    SET_USER_CONTEXT: "SET_USER_CONTEXT",
    CLEAR_CONTEXT: "CLEAR_CONTEXT",
    SET_CURRENT_USER: "SET_CURRENT_USER",
    SET_CURRENT_ITEM:"SET_CURRENT_USER",
    LOG_OUT_FETCH: ActionsGen(CommandList.User.LOG_OUT),


};

export default PRIVILEGE_ACTIONS;
