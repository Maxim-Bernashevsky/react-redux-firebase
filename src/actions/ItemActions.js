import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, LIKE_ITEM, GET_INITIAL_REQUEST,
    INITIAL_STATE_SUCCESS, LIKED, DISLIKE, CHAT_MESSAGE, DROP_DB_LIKES, API_TO_BASE_ITEM,
    TOOGLE_STYLE} from '../constants/item';

import { fb } from '../store/firebase';
import { getLikedId, removeLikedId, setLikedId } from '../store/localStorage';

function refreshState(dispatch, action) {
    fb.once('value', snapshot => {
        const freshStore = Object.assign({}, snapshot.val());
        dispatch({
            type: action,
            payload: freshStore
        });
    });
}

export const newFlagDB = newFlag => {

    fb.once('value', snapshot => {
        const base = snapshot.val();
        Object.keys(base.data).forEach( key => {
            const item = base.data[key];
            if(item.like > 0){
                fb.child('data/' + item.id).update({like: 0});
            }
        });
    });

    return (dispatch) => {
        fb.child('lider/').update({dropVote: newFlag});
        refreshState(dispatch, DROP_DB_LIKES);
    }
};

export const apiToBaseItem = item => {
    return (dispatch) => {
        const newItem = fb.child('data/').push(item);
        item.id = newItem.key;
        fb.child('data/' + newItem.key).update(item);
        refreshState(dispatch, API_TO_BASE_ITEM);
    };
};

export const deleteItem = id => {
    return (dispatch) => {
        fb.child('data/' + id).remove();
        refreshState(dispatch, DELETE_ITEM);
    };
};

export const editItem = item => {
    return (dispatch) => {
        fb.child('data/' + item.id).update(item);
        refreshState(dispatch, EDIT_ITEM);
    };
};

export const addItem = item => {
    return (dispatch) => {
        const newItem = fb.child('data/').push(item);
        item.id = newItem.key;
        fb.child('data/' + newItem.key).update(item);
        refreshState(dispatch, ADD_ITEM);
    };
};


export const likeItem = (id, like) => {
    if(!getLikedId()){
        setLikedId(id);

        return (dispatch) => {
            fb.child('data/'+ id).update({like: like + 1});
            let lider = {title: 'Title', like: 0};

            fb.on('value', snapshot => {
                const base = snapshot.val();
                Object.keys(base.data).forEach( key => {
                    const item = base.data[key];
                    if(item.like > lider.like){
                        lider.like = item.like;
                        lider.title = item.title;
                    }
                });
            });
            fb.child('lider/').update(lider);
            refreshState(dispatch, LIKE_ITEM);
        };
    }else{

        if(getLikedId() === id){
            removeLikedId();

            return (dispatch) => {
                fb.child('data/'+ id).update({like: like - 1});
                let lider = {title: 'Title', like: 0};

                fb.on('value', snapshot => {
                    const base = snapshot.val();
                    Object.keys(base.data).forEach( key => {
                        const item = base.data[key];
                        if(item.like > lider.like){
                            lider.like = item.like;
                            lider.title = item.title;
                        }
                    });
                });

                fb.child('lider/').update(lider);
                refreshState(dispatch, DISLIKE);
            };
        }

        return {
            type: LIKED,
            payload: false
        };
    }
};


export function addMessage(message){
    return (dispatch) => {
        fb.child('chat/').push({text: message});
        refreshState(dispatch, CHAT_MESSAGE);
    };
}


export function toggleStyle(style){
    console.log('style ', style);
    return {
        type: TOOGLE_STYLE,
        payload: style
    };
}

export function init(test) {
    return (dispatch) => {
        dispatch({
            type: GET_INITIAL_REQUEST,
            payload: test
        });
        //refreshState(dispatch, INITIAL_STATE_SUCCESS);
        fb.on('value', snapshot => {
            const freshStore = Object.assign({}, snapshot.val());
            dispatch({
                type: INITIAL_STATE_SUCCESS,
                payload: freshStore
            });
        });
    };
}








