import STATUSES_ACTIONS from "./actions";

const emptyState = {
    statuses: [],
    statuses_project: []
};
export default function StatusListReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case STATUSES_ACTIONS.GET_STATUSES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.statuses = action.data;
            return result;
        }
        case STATUSES_ACTIONS.GET_STATUSES_PROJECT_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.statuses_project = action.data;
            return result;
        }
        case STATUSES_ACTIONS.UPSERT_STATUS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.statuses_project = [
                ...result.statuses_project.filter((item) => item.id != action.dto.id),
                action.dto
            ];
            return result;
        }
        case STATUSES_ACTIONS.UPSERT_STATUS_GLOBAL_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.statuses = [
                ...result.statuses.filter((item) => item.id != action.dto.id),
                action.dto
            ];
            return result;
        }

        default: {
            return state;
        }
    }
}
