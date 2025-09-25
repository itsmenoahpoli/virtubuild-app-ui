import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from './user.state';
import { setUserType, setUserProfile, clearUser } from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(setUserType, (state, { userType }) => ({
    ...state,
    userType,
  })),
  on(setUserProfile, (state, { name, avatar }) => ({
    ...state,
    name,
    avatar,
  })),
  on(clearUser, () => initialUserState)
);
