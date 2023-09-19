import React from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Logout = () => {
  const router = useRouter();
  const { data: user } = useSession({ required: true, onUnauthenticated: () => { router.replace('/login'); } });

  React.useEffect(() => {
    if (user) {
      signOut({ redirect: true, callbackUrl: '/login' });
    }
  }, [user]);

  return (
    <React.Fragment />
  );
};

export default Logout;
