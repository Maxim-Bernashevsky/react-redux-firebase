import { TOGGLE_STYLE } from '../constants/item';
import { getColorScheme  } from '../store/localStorage';


const initialState = {
    test: 'Anonymous',
    useStyle: getColorScheme() || 'black'
};

export default function user(state = initialState, action) {


    switch (action.type) {
        case TOGGLE_STYLE:
            console.log('TOGGLE_STYLE');
            let freshState = Object.assign({}, state);
            freshState.useStyle = action.payload;
            return freshState;
        default:
            return state;
    }
}

