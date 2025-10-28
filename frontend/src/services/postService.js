import sendRequest from "./sendRequest";
const API_BASE_URL = 'https://www.linguamath.ca' || '';
const BASE_URL = `${API_BASE_URL}/api/auth`;


export async function index() {
  return sendRequest(BASE_URL);

}

export async function create(postData) {
  return sendRequest(BASE_URL, 'POST', postData);

}

