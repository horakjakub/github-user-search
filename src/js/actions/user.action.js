export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(name) {
    return {
        type: SET_CURRENT_USER,
        payload: name
    };
}