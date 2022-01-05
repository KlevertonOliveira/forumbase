import { FC, useState } from "react";

import { EmailIcon, InfoIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, InputRightElement, Input as ChakraInput } from '@chakra-ui/react';

import { TInput } from '../../types/TInput';
import { useField, ErrorMessage } from 'formik';


const Input: FC<TInput> = (props) => {

    const { name, type, placeholder, icon } = props;

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

          <ChakraInput
            {...field}
            id={name}
            name={name}
            isInvalid={meta.touched && !!meta.error}
            placeholder={placeholder}
            type={(type !== 'password') ? type : isPasswordVisible ? 'text' : 'password'}
            autoComplete='off'
          />
        </InputGroup>

        <ErrorMessage
          name={field.name}
          component={"p"}
          className='input-error'
        />
      </>
    );
};

export default Input;