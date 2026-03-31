import { createContext, ReactNode, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { loginRequest, registerRequest } from '../api/auth';
import { CurrentUser } from '../models/CurrentUser';
import { TokenPayload } from '../models/payload/TokenPayload';
import { UserLoginRequest } from '../models/payload/UserLoginRequest';
import { UserRegisterRequest } from '../models/payload/UserRegisterRequest';
import { UserAuthResponse } from '../models/payload/UserAuthResponse';
import { Role } from '../models/enums/Role';

interface AuthContextType {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: UserLoginRequest) => Promise<UserAuthResponse>;
  register: (payload: UserRegisterRequest) => Promise<UserAuthResponse>;
  logout: () => void;
  isLoggingIn: boolean;
}

const getUserFromToken = (token: string | null): CurrentUser | null => {
  if (!token) {
    return null;
  }

  try {
    const payload = jwtDecode<TokenPayload>(token);

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }

    return { id: payload.id, username: payload.sub, role: payload.role };
  } catch {
    localStorage.removeItem('token');
    return null;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() =>
    getUserFromToken(localStorage.getItem('token')),
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && e.newValue === null) {
        logout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  const handleAuthSuccess = useCallback(
    async (response: UserAuthResponse) => {
      localStorage.setItem('token', response.token);
      const user = getUserFromToken(response.token);
      setCurrentUser(user);
      await queryClient.invalidateQueries();
    },
    [queryClient],
  );

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: handleAuthSuccess,
  });

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: handleAuthSuccess,
  });

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === Role.ROLE_ADMIN,
      login: loginMutation.mutateAsync,
      register: registerMutation.mutateAsync,
      logout,
      isLoggingIn: loginMutation.isPending,
    }),
    [currentUser, logout, loginMutation.mutateAsync, registerMutation.mutateAsync],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
