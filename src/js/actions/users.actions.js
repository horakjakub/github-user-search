import { getUserNames } from '../helpers/responseParsers';

export const GET_USERS_REQUESTED = 'GET_USERS_REQUESTED';

function getUsersRequested() {
    return {
        type: GET_USERS_REQUESTED
    };
}

export const GET_USERS_DONE = 'GET_USERS_DONE';

function getUsersDone(userNames) {
    return {
        type: GET_USERS_DONE,
        payload: userNames
    };
}

export function getUsersRequest(name) {
    return (dispatch, getState, api) => {
        dispatch(getUsersRequested());

        api.getUsersByName(name)
            .then((userNames)=> {
                dispatch(getUsersDone(getUserNames(userNames)))
            })
    }
}
