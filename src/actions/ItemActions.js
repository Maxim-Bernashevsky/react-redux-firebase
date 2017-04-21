import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, LIKE_ITEM, GET_INITIAL_REQUEST,
    INITIAL_STATE_SUCCESS, LIKED, DISLIKE, CHAT_MESSAGE, NEW_LIDER } from '../constants/item';
import { fb } from '../store/firebase';


function refreshState(dispatch, action) {
    fb.on('value', snapshot => {
        dispatch({
            type: action,
            payload: snapshot.val()
        });
    });
}

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

    if(!localStorage.getItem('KeDc_tTenn65M2cyAiK_liked')){
        //console.log('LIKE');
        localStorage.setItem('KeDc_tTenn65M2cyAiK_liked', '1');
        localStorage.setItem('KeDc_tTenn65M2cyAiK_id_liked', id);

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

        if(localStorage.getItem('KeDc_tTenn65M2cyAiK_id_liked') === id){
            //console.log('DISLIKE');
            localStorage.removeItem('KeDc_tTenn65M2cyAiK_liked');
            localStorage.removeItem('KeDc_tTenn65M2cyAiK_id_liked');
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
    //console.log("NEW MESSAGE:", message);
    return (dispatch) => {
        fb.child('chat/').push({text: message});
        refreshState(dispatch, CHAT_MESSAGE);
    };
}


export function init(test) {
    return (dispatch) => {
        dispatch({
            type: GET_INITIAL_REQUEST,
            payload: test
        });
        refreshState(dispatch, INITIAL_STATE_SUCCESS);
    };
}






