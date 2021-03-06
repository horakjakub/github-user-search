import { GET_REPOSITORIES_DONE, GET_REPOSITORIES_REQUESTED } from '../actions';

const initalState = {
    isLoading: false,
    lists: {},
};

export default function repositoriesReducer(state = initalState, action) {
    switch (action.type) {
        case GET_REPOSITORIES_REQUESTED:
            return Object.assign({}, state, {isLoading: true});
        case GET_REPOSITORIES_DONE:
            return Object.assign({}, state, {
                isLoading: false,
                lists:
                    Object.assign(
                        {},
                        state.lists,
                        {
                            [action.payload.user]: action.payload.list
                        }
                    )
            });
        default:
            return state;
    }
}