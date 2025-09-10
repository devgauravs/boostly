// src/hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  loginUser,
  registerUser,
  facebookLogin,
  logout,
  clearError,
} from '../redux/AuthSlice';
import {
  LoginCredentials,
  RegisterData,
} from '../services/AuthService/authService';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, user, isLoading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const login = async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials)).unwrap();
  };

  const register = async (userData: RegisterData) => {
    return dispatch(registerUser(userData)).unwrap();
  };

  const loginWithFacebook = async () => {
    return dispatch(facebookLogin()).unwrap();
  };

  const signOut = async () => {
    return dispatch(logout()).unwrap();
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    token,
    user,
    isLoading,
    error,
    isAuthenticated: !!token,

    // Actions
    login,
    register,
    loginWithFacebook,
    signOut,
    clearAuthError,
  };
};
