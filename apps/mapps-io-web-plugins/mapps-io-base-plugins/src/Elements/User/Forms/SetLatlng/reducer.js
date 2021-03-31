import SET_LATLNG_ACTIONS from "./actions";

const emptyState = {
    countries: [
        {
            id: 506,
            name: "United Arab Emirates",
            longitude: 54.5,
            latitude: 23.75
        },
        {
            id: 564,
            name: "United Kingdom of Great Britain and Northern Ireland",
            longitude: -2.69531,
            latitude: 54.75844
        },
        {
            id: 684,
            name: "United States",
            longitude: -98.5,
            latitude: 39.76
        },
        {
            id: 527,
            name: "Federative Republic of Brazil",
            longitude: -55,
            latitude: -10
        },
        {
            id: 0,
            name: "",
            longitude: 0,
            latitude: 0
        }
    ],
    cities: [],
    regions: []
};
export default function SetLatlngReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case SET_LATLNG_ACTIONS.SET_USER_LATLNG.SUCCESS: {
            const result = Object.assign({}, state);
            result.exception = undefined;
            return result;
        }
        case SET_LATLNG_ACTIONS.SET_USER_LATLNG.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
        case SET_LATLNG_ACTIONS.SET_USER_LATLNG.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }
        case SET_LATLNG_ACTIONS.GET_COUNTRIES.SUCCESS: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            result.countries = action.data;
            result.cities = [];
            result.regions = [];
            return result;
        }
        case SET_LATLNG_ACTIONS.GET_CITIES.SUCCESS: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            result.cities = action.data;
            return result;
        }

        case SET_LATLNG_ACTIONS.GET_COUNTRIES.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }
        case SET_LATLNG_ACTIONS.SET_USER_LATLNG.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }
        default: {
            return state;
        }
    }
}
