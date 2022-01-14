import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import CustomTextarea from '../components/CustomTextarea';
import { Button } from '@chakra-ui/react';
import { answerValidationSchema } from '../helpers/validation/answerValidationSchema';
import { AnswerForm } from '../types/AnswerForm';

const Example = () => {

  const [contentValue, setContentValue] = useState('abcde');
  const [contentInputValue, setContentInputValue] = useState('');

  function handleSubmitForm({ content }: AnswerForm) {
    setContentValue(content);
    alert(contentValue);
  }

  return (
    <Formik
      initialValues={{
        content: contentValue,
      }}
      validationSchema={answerValidationSchema}
      onSubmit={(values, actions) => {
        handleSubmitForm(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {() =>
        <Form>
          <CustomTextarea name="content" placeholder='Content' />
          <Button variant='primary' type="submit">Submit</Button>
        </Form>
      }
    </Formik>
  )
};

export default Example;