import { UPDATE_USERLIST} from '../actions/UpdateUserList';
export default function UserListReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_USERLIST:
        return action.userlist;
        default: 
        return state;
    }
}