// src/services/authService.ts
import axios from 'axios';
import { AppDispatch } from '../redux/store';
import { setUser, resetUser } from '../redux/states/user'; 
import { environment } from '../../environment/enviroment';

const instance = axios.create({
  baseURL: environment.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await instance.post('/authentication/sign-in', { username, password });
    const { id, username: respUsername, token } = response.data;
    dispatch(setUser({ id, username: respUsername, token }));
    localStorage.setItem('token', token);
    console.log(`Signed in as ${respUsername} with token ${token}`);
  } catch (error: any) {
    dispatch(resetUser());
    console.error('Error while signing in:', error);
  }
};

export const register = (signUpRequest: any) => async (dispatch: AppDispatch) => {
  try {
    await instance.post('/authentication/sign-up', signUpRequest);
    console.log('Usuario registrado correctamente.');
  } catch (error: any) {
    console.error('Error signing up:', error);
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token');
  dispatch(resetUser());
  console.log('User signed out.');
};
