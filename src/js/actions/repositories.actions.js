import { getRepositoriesList } from '../helpers/responseParsers';

export const GET_REPOSITORIES_REQUESTED = 'GET_REPOSITORIES_REQUESTED';

function getRepositoriesRequested() {
    return {
        type: GET_REPOSITORIES_REQUESTED
    };
}

export const GET_REPOSITORIES_DONE = 'GET_REPOSITORIES_DONE';

function getRepositoriesDone(user, repositoriesList) {
    return {
        type: GET_REPOSITORIES_DONE,
        payload: {
            user,
            list: repositoriesList,
        }
    };
}

export function getRepositoriesRequest(user) {
    return (dispatch, getState, api) => {
        dispatch(getRepositoriesRequested());

        const repositoriesLists = getState().repositories.lists;
        const userList = repositoriesLists[user];
        const { page, list, total } = userList ? userList : { page: 0, list: [] };
        const nextPage = page + 1;

        if(userList && total && page === Math.ceil(total/10)){
            dispatch(getRepositoriesDone(user, userList));
        } else {
            api.getRepositoriesByUserName(user, nextPage)
                .then((repositories)=> {
                    if(!userList){
                        dispatch(getRepositoriesDone(user, getRepositoriesList(repositories, nextPage)))
                    } else {
                        const newList = getRepositoriesList(repositories, nextPage);
                        newList.list = [...list, ...newList.list];
                        dispatch(getRepositoriesDone(user, newList))
                    }
                })
        }
    }
}
