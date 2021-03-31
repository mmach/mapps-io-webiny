import { uuid } from "uuidv4";
import { NOTIFICATIONS_ACTIONS } from "./actions";

export default function NotificationReducer(state = [], action) {
    switch (action.type) {
        case NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL: {
            const result = [...state];
            const notif = action.notification;
            notif.guid = uuid();
            const exist = result.filter((item) => {
                return item.message == notif.message;
            });
            if (exist.length == 0) {
                result.push(notif);
            }
            return result;
        }
        case NOTIFICATIONS_ACTIONS.REMOVE_NOTIFICATION_GLOBAL: {
            const _result = [...state];
            const result = _result.filter((item) => {
                return item.guid != action.notification;
            });
            return result;
        }
        default: {
            return state;
        }
    }
}
