import {LOAD_IMAGE} from '../actions/LoadImage';
export default function LoadImageReducer(state = null, action) {

    switch(action.type) {
        case LOAD_IMAGE:
        return action.image;
        default: 
        return state;
    }
}