export const SEARCH_USER = 'searchuser';

export function SearchUser(newSearchUser) {
    return {
        type: SEARCH_USER,
        searchUser: newSearchUser
    };
}