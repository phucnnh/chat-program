export const UPDATE_MESSAGE = 'updatemessage';

export function UpdateMessage(newMessage) {
    return {
        type: UPDATE_MESSAGE,
        Message: newMessage
    };
}