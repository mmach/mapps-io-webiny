import NEW_OFFER_ACTIONS from "./actions";

const emptyState = {
    item: {
        category: {
            cat_opt: []
        },
        images: []
    },
    catOptions: [],
    category: {}
};
export default function CreatItemReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        /* case NEW_OFFER_ACTIONS.GET_USER_IMAGES.SUCCESS: {

            const result = Object.assign({}, state);
            console.log(action);
            result.images = action.data;
            return result;
        }*/

        case NEW_OFFER_ACTIONS.SET_CATEGORY: {
            const result = Object.assign({}, state);
            //  console.log(action.data);
            result.category = action.dto ? action.dto : result.category;
            return result;
        }
        case NEW_OFFER_ACTIONS.GET_CATEGORY_OPTION_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            //  console.log(action.data);
            result.catOptions = action.data;
            return result;
        }

        default: {
            return state;
        }
    }
}
