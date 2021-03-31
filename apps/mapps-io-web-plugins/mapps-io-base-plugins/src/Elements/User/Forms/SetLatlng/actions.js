import { CommandList, QueryList } from "justshare-shared";
import ActionsGen from "../../../../App/actions";

const SET_LATLNG_ACTIONS = {
    SET_USER_LATLNG: ActionsGen(CommandList.User.SET_COORDIATES),
    GET_COUNTRIES: ActionsGen(QueryList.Country.GET_COUNTRY),
    GET_CITIES: ActionsGen(QueryList.City.GET_CITY)
};

export default SET_LATLNG_ACTIONS;
