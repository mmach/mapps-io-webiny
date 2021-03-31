import MAP_SEARCH_ACTIONS from "./actions";

const emptyState = {
    zoom: 18,
    currentPosition: undefined,
    catAbovePin: []
};
export default function MapSearchReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        /* case NEW_OFFER_ACTIONS.GET_USER_IMAGES.SUCCESS: {

            const result = Object.assign({}, state);
            console.log(action);
            result.images = action.data;
            return result;
        }*/
        /* case
        NEW_OFFER_ACTIONS.GET_CATEGORY_OPTION_FETCH.SUCCESS: {

            const result = Object.assign({}, state);
            console.log(action.data);
            result.catOptions = action.data
            return result;
        }*/
        case MAP_SEARCH_ACTIONS.ON_MAP_INIT: {
            const result = Object.assign({}, state);
            (result.currentPosition = action.currentPosition), (result.zoom = 16);
            result.catAbovePin = [];

            return result;
        }
        case MAP_SEARCH_ACTIONS.SET_CURRENT_ELEMENT: {
            const result = Object.assign({}, state);
            (result.currentPosition = action.dto.latlon), (result.zoom = 18);

            return result;
        }
        case MAP_SEARCH_ACTIONS.SET_CURRENT_ELEMENT: {
            const result = Object.assign({}, state);
            (result.currentPosition = action.dto.latlon), (result.zoom = 18);

            return result;
        }
        case MAP_SEARCH_ACTIONS.SET_CATEGORIES_NEAR_THE_PIN: {
            const result = Object.assign({}, state);
            result.catAbovePin = [...action.dto.categories];

            return { ...result };
        }
        default: {
            return state;
        }
    }
}
