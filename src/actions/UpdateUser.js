export const UPDATE_USER = 'updateuser';

export function UpdateUser(newUser) {
    return {
        type: UPDATE_USER,
        user: newUser
    };
}