import { UPDATE_TEXTBOX} from '../actions/Textbox';
export default function TextboxReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_TEXTBOX:
        return action.textbox;
        default: 
        return state;
    }
}