import * as yup from 'yup'
export default yup.object().shape({
    name: yup
    .string()
    .required('name is required')
    .min(3, 'name must be 3 characters long'),
    email: yup
    .string()
    .email('must be a valid email'),
    password: yup
    .string()
    .required('password is required')
    .min(3, 'username must be longer than 3 characters'),
    tos: yup.boolean(),

})