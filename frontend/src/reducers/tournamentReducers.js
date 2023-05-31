import { TOURNAMENT_LIST_REQUEST,TOURNAMENT_LIST_SUCCESS, TOURNAMENT_LIST_FAIL, TOURNAMENT_CREATE_REQUEST, TOURNAMENT_CREATE_SUCCESS, TOURNAMENT_CREATE_FAIL, TOURNAMENT_UPDATE_FAIL, TOURNAMENT_UPDATE_REQUEST, TOURNAMENT_UPDATE_SUCCESS, TOURNAMENT_DELETE_FAIL, TOURNAMENT_DELETE_REQUEST, TOURNAMENT_DELETE_SUCCESS} from "../constants/tournamentConstants";

export const tournamentListReducer = (state = { tournament: [] }, action) => { 
    switch (action.type) {
        case TOURNAMENT_LIST_REQUEST:
            return { loading: true };
        case TOURNAMENT_LIST_SUCCESS:
            return { loading: false, tournament: action.payload };
        case TOURNAMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const tournamentCreateReducer = (state = {}, action) => {
    switch (action.type) {
            case TOURNAMENT_CREATE_REQUEST:
                return { loading: true };
            case TOURNAMENT_CREATE_SUCCESS:
                return { loading: false, success: true};
            case TOURNAMENT_CREATE_FAIL:
                return { loading: false, error: action.payload };
            default:
                return state;
        }
}
    
export const tournamentUpdateReducer = (state = {}, action) => {
    switch (action.type) {
            case TOURNAMENT_UPDATE_REQUEST:
                return { loading: true };
            case TOURNAMENT_UPDATE_SUCCESS:
                return { loading: false, success: true};
            case TOURNAMENT_UPDATE_FAIL:
                return { loading: false, error: action.payload };
            default:
                return state;
        }
}

export const tournamentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
                case TOURNAMENT_DELETE_REQUEST:
                    return { loading: true };
                case TOURNAMENT_DELETE_SUCCESS:
                    return { loading: false, success: true};
                case TOURNAMENT_DELETE_FAIL:
                    return { loading: false, error: action.payload, success: false};
                default:
                    return state;
            }
    }