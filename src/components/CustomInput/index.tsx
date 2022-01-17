import { FC, useState } from "react";

import { EmailIcon, InfoIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, InputRightElement, Input, Text, useColorModeValue } from '@chakra-ui/react';

import { useField } from 'formik';
import { useAuth } from '../../hooks/useAuth';


type CustomInputProps = {
  name: string;
  placeholder: string;
  type: 'email' | 'password' | 'text';
  icon: 'email' | 'password' | 'info' | 'search';
};

const CustomInput: FC<CustomInputProps> = (props) => {

  const { type, icon } = props;
  const { currentUser } = useAuth();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [field, meta] = useField(props);

  return (
    <>
      <InputGroup>

        <InputLeftElement>
          {icon === 'email' && <EmailIcon />}
          {icon === 'password' && <LockIcon />}
          {icon === 'info' && <InfoIcon />}
        </InputLeftElement>

        {
          type === 'password' &&
          <InputRightElement
            cursor={'pointer'}
            title='Toggle Password Visibility'
              onClick={() => { setIsPasswordVisible(!isPasswordVisible); }}
          >
            {isPasswordVisible ? <ViewIcon /> : <ViewOffIcon />}
          </InputRightElement>
        }

        <Input
          {...field}
          {...props}
          isInvalid={meta.touched && !!meta.error}
          type={(type !== 'password') ? type : isPasswordVisible ? 'text' : 'password'}
          autoComplete='off'
          disabled={!currentUser && (type !== 'email' && type !== 'password')}
        />
      </InputGroup>

      {
        meta.touched && meta.error &&
        <Text
          color={useColorModeValue('red.600', 'red.500')}
          fontSize={'sm'}
          fontWeight={'semibold'}
        >
          {meta.error}
        </Text>
      }
    </>
  );
};

export default CustomInput;