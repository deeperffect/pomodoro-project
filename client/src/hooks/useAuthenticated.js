import { UserContext } from '../components/UserContext';
import { useContext } from 'react';

function useAuthenticated() {
  const { currentUser } = useContext(UserContext);
  const isAuthenticated = !!currentUser?.token;

  return isAuthenticated;
}

export default useAuthenticated;