import axios from 'axios';

const baseURL = 'https://navedex-api.herokuapp.com/v1/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1NTA2ZDFmLThjZjUtNGNmYS1iNGQyLTU1M2JlYzVhNjJiNSIsImVtYWlsIjoiYW5kcmUuYm9yZ2VzQHRlc3RlLmNvbSIsImlhdCI6MTYxNTE0NTY3OX0.vE5TKuG7DGCV-Go0xRY2Y-DNdhktgU_SULIRTUTIYlM';

const api = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  headers: { Authorization: 'Bearer ' + token },
});

export default api;
