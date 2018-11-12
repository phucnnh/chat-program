import { SEARCH_USER} from '../actions/SearchUser';
export default function SearchUserReducer(state = null, action) {

    switch(action.type) {
        case SEARCH_USER:
        return action.searchUser;
        default: 
        return state;
    }
}