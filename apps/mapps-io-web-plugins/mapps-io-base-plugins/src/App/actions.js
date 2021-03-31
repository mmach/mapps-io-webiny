import { Enums } from "justshare-shared";

const ActionsGen = (action) => {
    return {
        SUCCESS: action + "_" + Enums.ACTIONS.SUCCESS,

        ERROR: action + "_" + Enums.ACTIONS.ERROR,

        LOADING: action + "_" + Enums.ACTIONS.LOADING,

        FINALLY: action + "_" + Enums.ACTIONS.FINALLY
    };
};
export default ActionsGen;
