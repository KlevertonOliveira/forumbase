import * as Yup from 'yup';

export const createPostValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(50, 'Title must not exceed 50 characters'),

   /*  category: Yup.string().required('Category is required'), */

    content: Yup.string()
        .required('Content is required')
        .min(5, 'Content must be at least 5 characters')
        .max(140, 'Password must not exceed 140 characters'),
})