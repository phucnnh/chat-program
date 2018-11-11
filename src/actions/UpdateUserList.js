export const UPDATE_USERLIST = 'updateuserlist';

export function UpdateUserList(newUserList) {
    return {
        type: UPDATE_USERLIST,
        userlist: newUserList
    };
}