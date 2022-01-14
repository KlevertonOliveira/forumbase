import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export const usePublicRoute = (Component: any) => {

  return function WithPublic(props: any) {
    const { currentUser } = useAuth();
    const router = useRouter();

    if (currentUser) {
      router.back();
      return <div></div>;
    }

    return <Component {...props} />;
  };
};