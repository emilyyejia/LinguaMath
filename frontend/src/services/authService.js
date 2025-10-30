import sendRequest from "./sendRequest";
const API_BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://www.linguamath.ca'
    : 'http://localhost:3000';
const BASE_URL = `${API_BASE_URL}/api/auth`;

export async function signUp(userData) {
    const token = await sendRequest(BASE_URL + '/signup', 'POST', userData);
    localStorage.setItem('token', token);
    return getUser();
}

export async function logIn(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export async function deleteAccount(password) {
  await sendRequest(`${BASE_URL}/account`, 'DELETE', { password });
  localStorage.removeItem('token');
  return null;
}

export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function getToken () {
      // getItem returns null if there's no key
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;  

}

export function logOut() {
    localStorage.removeItem('token');
}