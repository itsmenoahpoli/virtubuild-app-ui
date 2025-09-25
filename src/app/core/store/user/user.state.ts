import { USER_TYPES } from '@/app/shared/utils/types.utils';

export interface UserState {
  userType: USER_TYPES | null;
  name: string | null;
  avatar?: string | null;
}

export const initialUserState: UserState = {
  userType: null,
  name: null,
  avatar: null,
};
