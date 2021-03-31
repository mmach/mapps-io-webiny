import USER_PROFILE_IMAGE from "./actions";

const emptyState = {
    isLoading: true,
    user: {
        blop_profile: ""
    }
};
export default function UserImageReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case USER_PROFILE_IMAGE.USER_INFO_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.user = { ...action.data };
            return result;
        }

        case USER_PROFILE_IMAGE.USER_INFO_FETCH.LOADING: {
            const result = Object.assign({}, state);
            //result.isLoading = true;
            return result;
        }
        case USER_PROFILE_IMAGE.USER_INFO_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            //result.isLoading = false;
            return result;
        }
        case USER_PROFILE_IMAGE.SET_LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = action.dto;
            return result;
        }
        default: {
            return state;
        }
    }
}
