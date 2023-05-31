import { MATCH_LIST_REQUEST,MATCH_LIST_SUCCESS, MATCH_LIST_FAIL, MATCH_CREATE_REQUEST, MATCH_CREATE_SUCCESS, MATCH_CREATE_FAIL, MATCH_UPDATE_FAIL, MATCH_UPDATE_REQUEST, MATCH_UPDATE_SUCCESS, MATCH_DELETE_FAIL, MATCH_DELETE_REQUEST, MATCH_DELETE_SUCCESS} from "../constants/matchConstants";

export const matchListReducer = (state = { match: [] }, action) => { 
    switch (action.type) {
        case MATCH_LIST_REQUEST:
            return { loading: true };
        case MATCH_LIST_SUCCESS:
            return { loading: false, match: action.payload };
        case MATCH_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const matchCreateReducer = (state = {}, action) => {
    switch (action.type) {
            case MATCH_CREATE_REQUEST:
                return { loading: true };
            case MATCH_CREATE_SUCCESS:
                return { loading: false, success: true};
            case MATCH_CREATE_FAIL:
                return { loading: false, error: action.payload };
            default:
                return state;
        }
}
    
export const matchUpdateReducer = (state = {}, action) => {
    switch (action.type) {
            case MATCH_UPDATE_REQUEST:
                return { loading: true };
            case MATCH_UPDATE_SUCCESS:
                return { loading: false, success: true};
            case MATCH_UPDATE_FAIL:
                return { loading: false, error: action.payload };
            default:
                return state;
        }
}

export const matchDeleteReducer = (state = {}, action) => {
    switch (action.type) {
                case MATCH_DELETE_REQUEST:
                    return { loading: true };
                case MATCH_DELETE_SUCCESS:
                    return { loading: false, success: true};
                case MATCH_DELETE_FAIL:
                    return { loading: false, error: action.payload, success: false};
                default:
                    return state;
            }
    }