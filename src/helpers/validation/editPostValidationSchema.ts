import * as Yup from 'yup';

export const editPostValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(140, 'Title must not exceed 140 characters'),

    content: Yup.string()
        .required('Content is required')
        .min(5, 'Content must be at least 5 characters')
        .max(140, 'Password must not exceed 140 characters'),
})