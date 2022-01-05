import { FC } from "react";

import { Select as ChakraSelect } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';

type SelectProps = {
  name: string;
};

const Select: FC<SelectProps> = (props) => {

  const [field, meta] = useField(props);

  return (
    <>
      <ChakraSelect
        {...field}
        {...props}
        id={props.name}
        isInvalid={meta.touched && !!meta.error}
      />
      <ErrorMessage
        name={field.name}
        component={"p"}
        className='input-error'
      />
    </>
  );
};

export default Select;