import { combineReducers } from 'redux';
import users from './users.reducer';
import repositories from './repositories.reducer'
import user from './user.reducer';

export default combineReducers({
    currentUser: user,
    users,
    repositories,
})