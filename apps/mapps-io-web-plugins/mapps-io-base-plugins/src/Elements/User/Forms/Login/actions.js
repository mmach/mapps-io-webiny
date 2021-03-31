import { CommandList, QueryList } from "justshare-shared";
import ActionsGen from "../../../../App/actions";

const LOGIN_ACTIONS = {
    LOG_IN_INTERNAL_FETCH: ActionsGen(QueryList.User.LOG_IN_INTERNAL),
    GEN_REFRESH_TOKEN_FETCH: ActionsGen(CommandList.User.GEN_REFRESH_TOKEN),
    GET_REFRESH_TOKEN_FETCH: ActionsGen(QueryList.User.GET_REFRESH_TOKEN),

};

export default LOGIN_ACTIONS;
