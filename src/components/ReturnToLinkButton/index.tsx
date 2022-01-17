import { FC } from "react";
import router from 'next/router';

import { Button } from '@chakra-ui/react';

type ReturnButtonProps = {
  linkPage: 'Home' | 'Login';
};

const ReturnToLinkButton: FC<ReturnButtonProps> = ({ linkPage }) => {
  return (
    <Button
      variant='solid'
      bg={'#A22522'}
      color='white'
      _hover={{ bg: '#821e1b' }}
      onClick={() => router.push(linkPage === 'Home' ? '/' : '/login')}
    >
      Return to {linkPage}
    </Button>
  );
};

export default ReturnToLinkButton;