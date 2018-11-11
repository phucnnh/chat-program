import { UPDATE_MESSAGE} from '../actions/UpdateMessage';
export default function MessageReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_MESSAGE:
        return action.tMessage;
        default: 
        return state;
    }
}