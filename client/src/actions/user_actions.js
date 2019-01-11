import axios from 'axios';
import { USER_SERVER } from '../Components/utils/misc';
import { LOGIN_USER, REGISTER_USER } from './types';

// export function loginUser(dataToSubmit) {
//   const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
//     .then(response => response.data);

//   return {
//     type: LOGIN_USER,
//     payload: request
//   }
// }

// export const loginUser = (dataToSubmit) => async dispatch =>{
//   const res = await axios.post(`${USER_SERVER}/login`, dataToSubmit)

//   console.log('login', res.data);

//   return {
//     type: LOGIN_USER,
//     payload: res.data
//   }
// }

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data)

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data)

  return {
    type: REGISTER_USER,
    payload: request
  }
}

// export const registerUser = (dataToSubmit) => async dispatch => {
//   const res = await axios.post(`${USER_SERVER}/login`, dataToSubmit);

//   return {
//     type: REGISTER_USER,
//     payload: res.data
//   }
// }