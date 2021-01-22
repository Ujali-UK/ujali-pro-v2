import { authActionTypes } from './../action-types/auth.types';

interface Auth {
  user: User | null;
}

type User = {
  name?: string;
  email?: string;
};

const initialState: Auth = {
  user: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return { ...state, tokenVerified: true };
    default:
      return state;
  }
};
