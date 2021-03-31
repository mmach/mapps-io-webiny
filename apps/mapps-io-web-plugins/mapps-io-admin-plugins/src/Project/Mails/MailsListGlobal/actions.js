import { QueryList } from "justshare-shared";
import ActionsGen from "mapps-io-base-plugins/src/App/actions";

const MAIL_LIST_ACTIONS = {
    GET_MAIL_TYPE_PROJECT_FETCH: ActionsGen(QueryList.Mail.GET_MAIL_TYPE_PROJECT),
    GET_MAIL_SENDER_FETCH: ActionsGen(QueryList.Mail.GET_MAIL_SENDER),
    GET_MAIL_TYPE_FETCH: ActionsGen(QueryList.Mail.GET_MAIL_TYPE),
    GET_MAIL_PART_FETCH: ActionsGen(QueryList.Mail.GET_MAIL_PART)
};

export default MAIL_LIST_ACTIONS;
