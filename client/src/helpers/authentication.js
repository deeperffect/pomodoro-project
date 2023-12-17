export const onAuthError = () => {
  localStorage.removeItem('token');
  window.location.href = '/users/login';
};