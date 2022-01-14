import { FC } from "react";

import { InfoIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Textarea, Text, useColorModeValue } from '@chakra-ui/react';

import { useField } from 'formik';
import { useAuth } from '../../hooks/useAuth';

type CustomTextareaProps = {
  name: string;
  placeholder: string;
  value?: string;
};

const CustomTextarea: FC<CustomTextareaProps> = (props) => {

  const [field, meta] = useField(props);
  const { currentUser } = useAuth();

  return (
    <>
      <InputGroup>

        <InputLeftElement>
          <InfoIcon />
        </InputLeftElement>

        <Textarea
          {...field}
          {...props}
          pl={10}
          isInvalid={meta.touched && !!meta.error}
          disabled={!currentUser}
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

export default CustomTextarea;