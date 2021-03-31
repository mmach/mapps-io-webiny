import MAIL_LIST_ACTIONS from "./actions";

const emptyState = {
    mail_types: [],
    mail_senders: [],
    mail_types_global: [],
    mail_parts: []
};
export default function MailsListReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case MAIL_LIST_ACTIONS.GET_MAIL_TYPE_PROJECT_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.mail_types = action.data;
            return result;
        }
        case MAIL_LIST_ACTIONS.GET_MAIL_SENDER_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.mail_senders = action.data;
            return result;
        }
        case MAIL_LIST_ACTIONS.GET_MAIL_TYPE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.mail_types_global = action.data;
            return result;
        }
        case MAIL_LIST_ACTIONS.GET_MAIL_PART_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.mail_parts = action.data;
            return result;
        }

        default: {
            return state;
        }
    }
}
