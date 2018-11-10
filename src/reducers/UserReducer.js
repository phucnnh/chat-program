import { UPDATE_USER} from '../actions/UpdateUser';

export default function UserReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_USER:
        return action.user;
        default: 
        return state;
    }
}