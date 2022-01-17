import { FC } from "react";

import { Select, Text, useColorModeValue } from '@chakra-ui/react';

import { useField } from 'formik';
import { useAuth } from '../../hooks/useAuth';

type CustomSelectProps = {
  name: string;
};

const CustomSelect: FC<CustomSelectProps> = (props) => {

  const [field, meta] = useField(props);
  const { currentUser } = useAuth();

  return (
    <>
      <Select
        {...field}
        {...props}
        id={props.name}
        isInvalid={meta.touched && !!meta.error}
        disabled={!currentUser}
      />

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

export default CustomSelect;