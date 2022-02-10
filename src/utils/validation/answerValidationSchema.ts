import * as Yup from 'yup';

export const answerValidationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Content is required')
    .min(5, 'Content must contain at least 5 characters')
    .max(140, 'Content must not exceed 140 characters'),
})