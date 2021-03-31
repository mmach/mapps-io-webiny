import { LANGUAGE_ACTIONS } from "./actions";


export default function LanguageReducer(state = "us", action) {
    switch (action.type) {
        case LANGUAGE_ACTIONS.SET_LANGUAGE: {
            return action.lang;
        }

        default: {
            return state;
        }
    }
}
