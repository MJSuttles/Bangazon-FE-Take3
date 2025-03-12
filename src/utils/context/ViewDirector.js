import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <SignIn />;
  }

  // if (!databaseUser || Object.keys(databaseUser).length === 0) {
  //   return <RegistrationForm user={user} />;
  // }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
