export const REPLACE_USERS = 'REPLACE_USERS';

export const replaceUsers = (users) => ({
    type: REPLACE_USERS,
    payload: [...users]
});