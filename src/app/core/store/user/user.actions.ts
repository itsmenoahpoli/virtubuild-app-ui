import { createAction, props } from '@ngrx/store';
import { USER_TYPES } from '@/app/shared/utils/types.utils';

export const setUserType = createAction(
  '[User] Set User Type',
  props<{ userType: USER_TYPES }>()
);

export const setUserProfile = createAction(
  '[User] Set User Profile',
  props<{ name: string; avatar?: string }>()
);

export const clearUser = createAction('[User] Clear User');
