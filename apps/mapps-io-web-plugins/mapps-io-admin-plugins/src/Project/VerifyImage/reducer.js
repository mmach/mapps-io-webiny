import VERIFY_IMAGE_ACTION from "./actions";

const emptyState = {
    images: [],

    getImagesIsLoading: false
};
export default function VerifyImageReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case VERIFY_IMAGE_ACTION.GET_UNVERIFIED.SUCCESS: {
            const result = Object.assign({}, state);
            result.images = action.data;
            return result;
        }
        case VERIFY_IMAGE_ACTION.GET_UNVERIFIED.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;
            return result;
        }
        case VERIFY_IMAGE_ACTION.GET_UNVERIFIED.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        case VERIFY_IMAGE_ACTION.REMOVE_IMAGE.LOADING: {
            const result = Object.assign({}, state);
            result.images = state.images.map((item) => {
                if (item.id == action.dto.id) {
                    item.isLoading = true;
                }
                return item;
            });
            return result;
        }
        case VERIFY_IMAGE_ACTION.REMOVE_IMAGE.SUCCESS: {
            const result = Object.assign({}, state);
            result.images = state.images.filter((item) => {
                return item.id != action.dto.id;
            });
            return result;
        }
        case VERIFY_IMAGE_ACTION.REMOVE_IMAGE.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;

            return result;
        }
        case VERIFY_IMAGE_ACTION.VERIFY_IMAGE.SUCCESS: {
            const result = Object.assign({}, state);
            result.images = state.images.filter((item) => {
                return item.id != action.dto.id;
            });
            return result;
        }
        case VERIFY_IMAGE_ACTION.VERIFY_IMAGE.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        default: {
            return state;
        }
    }
}
