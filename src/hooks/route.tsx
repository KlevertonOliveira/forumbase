import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

export function withPublic(Component: any) {
  return function WithPublic(props: any) {

    const { currentUser } = useAuth();
    const router = useRouter();

    if (!!currentUser) {
      router.replace('/');
      return (
        <div />
      );
    }
    return <Component {...props} />;
  };
}