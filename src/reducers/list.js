import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, LIKE_ITEM, GET_INITIAL_REQUEST,
    INITIAL_STATE_SUCCESS, LIKED, DISLIKE, CHAT_MESSAGE, NEW_LIDER } from '../constants/item';

const defaultState = { list: [], user: [] };


export default function list( state = defaultState, action ) {

    switch (action.type) {
        case GET_INITIAL_REQUEST:
            return false;

        case INITIAL_STATE_SUCCESS:
        case DELETE_ITEM:
        case EDIT_ITEM:
        case ADD_ITEM:
        case LIKE_ITEM:
        case DISLIKE:
        case CHAT_MESSAGE:
        case NEW_LIDER:
            return action.payload;

        case LIKED:
        default:
            return state;

    }
}



