import { FC } from "react";

import { InfoIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Textarea as ChakraTextarea, useColorModeValue } from '@chakra-ui/react';

import { useField, ErrorMessage } from 'formik';

type TextareaProps = {
  name: string;
  placeholder: string;
};

const Textarea: FC<TextareaProps> = (props) => {

  const { name, placeholder } = props;
  const [field, meta] = useField(props);

  return (
    <>
      <InputGroup>

        <InputLeftElement>
          <InfoIcon />
        </InputLeftElement>

        <ChakraTextarea
          {...field}
          name={name}
          id={name}
          pl={10}
          isInvalid={meta.touched && !!meta.error}
          placeholder={placeholder}
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

export default Textarea;