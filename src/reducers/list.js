import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, LIKE_ITEM, GET_INITIAL_REQUEST,
    INITIAL_STATE_SUCCESS, LIKED, DISLIKE, CHAT_MESSAGE, DROP_DB_LIKES, API_TO_BASE_ITEM } from '../constants/item';

const defaultState = { list: [], user: [] };

export default function list( state = defaultState, action ) {

    switch (action.type) {
        case GET_INITIAL_REQUEST:
            return false;
        case INITIAL_STATE_SUCCESS:
            console.log('success');
            return action.payload;
        case DELETE_ITEM:
            console.log('DELETE_ITEM');
            return action.payload;
        case EDIT_ITEM:
            console.log('EDIT_ITEM');
            return action.payload;
        case ADD_ITEM:
            console.log('ADD_ITEM');
            return action.payload;
        case API_TO_BASE_ITEM:
            console.log('API_TO_BASE_ITEM');
            return action.payload;
        case LIKE_ITEM:
            console.log('LIKE_ITEM');
            return action.payload;
        case DISLIKE:
            console.log('DISLIKE');
            return action.payload;
        case CHAT_MESSAGE:
            console.log('CHAT_MESSAGE');
            return action.payload;
        case DROP_DB_LIKES:
            return action.payload;
        case LIKED:
            console.log('CHAT_MESSAGE');
            return state;
        default:
            return state;
    }
}



