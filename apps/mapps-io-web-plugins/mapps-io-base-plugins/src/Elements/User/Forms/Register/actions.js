import { CommandList } from "justshare-shared";
import ActionsGen from "../../../../App/actions";

const REGISTER_USER_ACTIONS = {
    CREATE_USER_FETCH: ActionsGen(CommandList.User.CREATE_USER)
};

export default REGISTER_USER_ACTIONS;
