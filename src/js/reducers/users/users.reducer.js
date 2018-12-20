import { GET_USERS_REQUESTED, GET_USERS_DONE } from "../../actions/users.actions";

const initalState = {
    isLoading: false,
    users: null,
};

export default function usersReducer(state = initalState, action) {
    switch (action.type) {
    case GET_USERS_REQUESTED:
        return { ...state, isLoading: true };
    case GET_USERS_DONE:
        return { ...state, isLoading: false, users: [ ...action.payload ] };
    default:
        return state;
    }
}