import { QueryList } from "justshare-shared";
import ActionsGen from "../../../../App/actions";

const USER_PROFILE_IMAGE = {
    USER_INFO_FETCH: ActionsGen(QueryList.User.USER_INFO),
    SET_LOADING:'SET_LOADING'
};

export default USER_PROFILE_IMAGE;
