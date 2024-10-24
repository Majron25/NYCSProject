import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { user, isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Wait until user data and isLoggedIn are defined
      if (isLoggedIn === false) {
        router.push('/login'); // Redirect to login if not logged in
      } else if (user && !allowedRoles.includes(user?.role)) {
        router.push('/'); // Redirect to home if role is not allowed
      }
    }, [isLoggedIn, user, router]);

    // Render loading while waiting for user data to load
    if (isLoggedIn === undefined || user === undefined) {
      return <div>Loading...</div>; // Show loading while user data is being fetched
    }

    // If user is logged in and has the allowed role, render the component
    if (isLoggedIn && user && allowedRoles.includes(user.role)) {
      return <WrappedComponent user={user} {...props} />;
    }

    // If user is not logged in or has no allowed role, return null
    return null;
  };
};

export default withAuth;
