import { TOOGLE_STYLE } from '../constants/item';


const initialState = {
    test: 'Anonymous',
    useStyle: 'black'
};

export default function user(state = initialState, action) {


    switch (action.type) {

        case TOOGLE_STYLE:
            console.log('TOOGLE_STYLE');
            let freshState = Object.assign({}, state);
            freshState.useStyle = action.payload;
            //console.log('new state', freshState);
            return freshState;
        default:
            return state;
    }
}

