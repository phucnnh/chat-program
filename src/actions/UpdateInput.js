export const UPDATE_INPUT = 'updateinput';

export function updateInput(newInput) {
    return {
        type: UPDATE_INPUT,
        input: newInput
    };
}