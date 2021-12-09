import { Store } from 'pullstate';

export const AuthStore = new Store(null);

/**
 * jwt
 */
const jwt = () => {
  
  return localStorage.getItem('access_token');
};

/**
 * authValidate
 */
export const authValidate = async (payload) => {

  try {

    const request = await fetch(`http://18.228.30.230:3001/user/validate`, {
      method: 'POST',
      body: payload,
      credentials: 'include',
    });

    const response = await request.json();

    if (response
      && response.success
      && response.token) {

      localStorage.setItem('access_token', response.token);

      return response.token;
    }
    else {
      return undefined;
    }
  }
  catch (error) {
    
    return undefined;
  }
};

/**
 * authUser
 */
export const authUser = async () => {

  const token = jwt();

  try {

    const request = await fetch(`http://18.228.30.230:3001/user/info`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const response = await request.json();

    return (response && response.success) ? response.data : undefined;
  }
  catch (error) {
    
    return undefined;
  }
};

/**
 * authLogout
 */
export const authLogout = async () => {

  const token = jwt();

  try {

    const request = await fetch(`http://18.228.30.230:3001/logout`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const response = await request.json();

    if (response && response.success) {

      localStorage.removeItem('access_token');
    }
  }
  catch (error) {

    return undefined;
  }
};
