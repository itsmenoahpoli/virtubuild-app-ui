import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserType = createSelector(
  selectUserState,
  (state: UserState) => state.userType
);

export const selectUserProfile = createSelector(
  selectUserState,
  (state: UserState) =>
    state.name
      ? {
          name: state.name,
          avatar: state.avatar || undefined,
        }
      : null
);
