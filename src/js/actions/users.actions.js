import { getUserNames } from "../helpers";

export const GET_USERS_REQUESTED = 'GET_USERS_REQUESTED';

export function getUserRequested() {
    return {
        type: 'GET_USERS_REQUESTED'
    };
}

export const GET_USERS_DONE = 'GET_USERS_DONE';

export function getUserDone(userNames) {
    return {
        type: 'GET_USERS_DONE',
        payload: userNames
    };
}

export function getUsers(name) {
    return (dispatch, getState, api) => {
        // @TODO - change on async await - after
        dispatch(getUserRequested());

        api.getUsersByName(name)
            .then((userNames)=> {
                dispatch(getUserDone(getUserNames(userNames)))
            })
    }
}
