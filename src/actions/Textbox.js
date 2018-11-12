export const UPDATE_TEXTBOX = 'updatetextbox';

export function Textbox(newTextbox) {
    return {
        type: UPDATE_TEXTBOX,
        textbox: newTextbox
    };
}