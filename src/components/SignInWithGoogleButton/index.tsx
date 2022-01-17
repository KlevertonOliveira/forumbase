import { FC } from "react";

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

import { Button, Text, useToast } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

type SignInWithGoogleButtonProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const SignInWithGoogleButton: FC<SignInWithGoogleButtonProps> =
  ({ loading, setLoading }) => {

    const { loginWithGooglePopup } = useAuth();
    const router = useRouter();
    const toast = useToast();

    async function handleLoginWithGoogle() {

      setLoading(true);

      try {
        await loginWithGooglePopup();
        setLoading(false);
        router.push('/');
      }

      catch (error) {
        toast({
          title: 'Error!',
          description: "Error when trying to log user in. Please, try again.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    }

    return (
      <Button
        aria-label='Sign in with Google account'
        bg='black'
        _hover={{
          backgroundColor: '#191919',
          transitionProperty: 'backgroundColor',
          msTransitionDuration: '200',
          transitionTimingFunction: 'ease-in'
        }}
        type='button'
        disabled={loading}
        onClick={handleLoginWithGoogle}
      >
        <FcGoogle />
        <Text ml='2' color='white'>Sign in with Google</Text>
      </Button>
    );
  };

export default SignInWithGoogleButton;