import apiClient from './client';
import { UserLoginRequest } from '../models/payload/UserLoginRequest';
import { UserAuthResponse } from '../models/payload/UserAuthResponse';
import { UserRegisterRequest } from '../models/payload/UserRegisterRequest';

export const loginRequest = async (payload: UserLoginRequest): Promise<UserAuthResponse> => {
  const res = await apiClient.post<UserAuthResponse>('/auth/login', payload);
  return res.data;
};

export const registerRequest = async (payload: UserRegisterRequest): Promise<UserAuthResponse> => {
  const res = await apiClient.post<UserAuthResponse>('/auth/register', payload);
  return res.data;
};
