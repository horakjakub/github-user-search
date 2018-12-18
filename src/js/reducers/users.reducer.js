const initalState = {
    users: null,
};

export default function usersReducer(state = initalState, action) {
    switch (action.type) {
    case 'REPLACE_USERS':
        return {
            users: [ ...action.payload ]
        };
    default:
        return state;
    }
}