import { CommandList, QueryList } from "justshare-shared";
import ActionsGen from "../../App/actions";

/*
 * action types
 */

const DICTIONARY_ACTIONS = {
    GET_DICTIONARY_FETCH: ActionsGen(QueryList.Dictionary.GET_DICTIONARY),
    ADD_DICTIONARY_FETCH: ActionsGen(CommandList.Dictionary.ADD_DICTIONARY),
    REMOVE_DICTIONARY_FETCH: ActionsGen(CommandList.Dictionary.REMOVE_DICTIONARY)
};

export default DICTIONARY_ACTIONS;
