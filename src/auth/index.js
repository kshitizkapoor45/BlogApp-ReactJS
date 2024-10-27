

import { toast } from 'react-toastify';
import { myAxios } from '../services/Helper';

export const isLoggedIn = () => {
   if(localStorage.getItem('authToken'))
   {
     return true;
   } else{
    return false;
   }
};

export const doLogin = (loginData, onSuccess, onFailure) => {
  const authHeader = 'Basic ' + btoa(`${loginData.email}:${loginData.password}`);
  const email = loginData.email;

  myAxios.post('/api/auth/login', {}, {
    headers: {
      Authorization: authHeader
    }
  })
  .then((response) => {
    const userDto = response.data;
    localStorage.setItem('authToken', authHeader);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('Email',email)
    localStorage.setItem('userId',userDto.id);
    localStorage.setItem('name',userDto.name);
    

    toast.success("Login successful!");
    if (onSuccess) onSuccess(response);
  })
  .catch((error) => {
    toast.error("Invalid credentials or server error");
    if (onFailure) onFailure(error);
  });
};

export const doLogout = (next) => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('Email')
  localStorage.removeItem('userId')
  localStorage.removeItem('name')
  toast.success("Logged out successfully!");
  next();
};

export const getCurrentUser = () => {
  if (isLoggedIn()) {
    return localStorage?.getItem('Email');
  }
  return null;
};

export const getUserId = () => {

  if (isLoggedIn()) {
    return localStorage?.getItem('userId');
  }
  return null;
   
}

export const getToken = () => {

  if (isLoggedIn()) {
    return localStorage?.getItem('authToken');
  }
  return null;
   
}


