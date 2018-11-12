import { NEW_MESSAGE} from '../actions/NewMessage';
export default function NewMessageReducer(state = null, action) {

    switch(action.type) {
        case NEW_MESSAGE:
        return action.newMessage;
        default: 
        return state;
    }
}