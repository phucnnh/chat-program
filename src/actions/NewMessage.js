export const NEW_MESSAGE = 'newmessage';

export function NewMessage(newMessage) {
    return {
        type: NEW_MESSAGE,
        newMessage: newMessage
    };
}