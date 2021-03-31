import { QueryList, CommandList } from "justshare-shared";
import ActionsGen from "mapps-io-base-plugins/src/App/actions";

const STATUSES_ACTIONS = {
    GET_STATUSES_FETCH: ActionsGen(QueryList.Status.GET_GLOBAL_STATUSES),
    GET_STATUSES_PROJECT_FETCH: ActionsGen(QueryList.Status.GET_STATUS),

    UPSERT_STATUS_FETCH: ActionsGen(CommandList.Status.UPSERT_STATUS),
    UPSERT_STATUS_GLOBAL_FETCH: ActionsGen(CommandList.Status.UPSERT_STATUS_GLOBAL)
};

export default STATUSES_ACTIONS;
