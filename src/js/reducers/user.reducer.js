import { SET_CURRENT_USER } from "../actions";

const initalState = {
    name: null
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return Object.assign({}, state, { name: action.payload });
        default:
            return state;
    }
}