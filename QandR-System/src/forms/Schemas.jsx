import React from 'react'
import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const phoneRules = /^[+][0-9]+$/

export const CreateUserSchema = yup.object().shape({
    Firstname: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(20, 'Firstname must be atmost 20 characters long')
        .required('Required'),
    Lastname: yup
        .string()
        .min(2, 'Lastname must be atleast 2 characters long')
        .max(20, 'Lastname must be atmost 20 characters long')
        .required('Required'),
    Email: yup
        .string()
        .email('Please enter a valid email')
        .required('Required'),
    PhoneNumber: yup
        .string()
        .min(9, 'Phone number must be atleast 9 numbers')
        .required('Required')
        .max(15, 'Phone number must not be more than 15')
        .matches(phoneRules, { message: 'Please enter a valid phone number' }),
    Password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: 'Please create a strong password' })
        .required('Required'),
    ConfirmPassword: yup
        .string()
        .oneOf([yup.ref('Password'), null], 'Passwords must match')
        .required('Required'),
    Gender: yup
        .string()
        .oneOf(['Male', 'Female'], 'Please select a valid option')
        .required('Required'),
    Title: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(10, 'Firstname must be atmost 10 characters long')
        .required('Required'),
    Marital_status: yup
        .string()
        .oneOf(['Married', 'Single', 'Divorced'], 'Please select a valid option')
        .required('Required'),
    Role: yup
        .string()
        .oneOf(['User', 'Admin', 'Student', 'Lecturer'], 'Please select a valid option')
        .required('Required'),
})

export const updateUserSchema = yup.object().shape({
    Firstname: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(20, 'Firstname must be atmost 20 characters long')
        .required('Required'),
    Lastname: yup
        .string()
        .min(2, 'Lastname must be atleast 2 characters long')
        .max(20, 'Lastname must be atmost 20 characters long')
        .required('Required'),
    Email: yup.string().email('Please enter a valid email').required('Required'),
    PhoneNumber: yup
        .string()
        .min(9, 'Phone number must be atleast 9 numbers')
        .required('Required')
        .max(15, 'Phone number must not be more than 15')
        .matches(phoneRules, { message: 'Please enter a valid phone number' }),
    Gender: yup
        .string()
        .oneOf(['Male', 'Female'], 'Please select a valid option')
        .required('Required'),
    Title: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(10, 'Firstname must be atmost 10 characters long')
        .required('Required'),
    Marital_status: yup
        .string()
        .oneOf(['Married', 'Single', 'Divorced'], 'Please select a valid option')
        .required('Required'),
    Role: yup
        .string()
        .oneOf(['User', 'Admin', 'Student', 'Lecturer'], 'Please select a valid option')
        .required('Required'),
})

export const CreateStudentSchema = yup.object().shape({
    Firstname: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(20, 'Firstname must be atmost 20 characters long')
        .required('Required'),
    Lastname: yup
        .string()
        .min(2, 'Lastname must be atleast 2 characters long')
        .max(20, 'Lastname must be atmost 20 characters long')
        .required('Required'),
    Email: yup
        .string()
        .email('Please enter a valid email')
        .required('Required'),
    PhoneNumber: yup
        .string()
        .min(9, 'Phone number must be atleast 9 numbers')
        .required('Required')
        .max(15, 'Phone number must not be more than 15')
        .matches(phoneRules, { message: 'Please enter a valid phone number' }),
    Password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: 'Please create a strong password' })
        .required('Required'),
    ConfirmPassword: yup
        .string()
        .oneOf([yup.ref('Password'), null], 'Passwords must match')
        .required('Required'),
    Gender: yup
        .string()
        .oneOf(['Male', 'Female'], 'Please select a valid option')
        .required('Required'),
    RegNo: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(20, 'Firstname must be atmost 10 characters long')
        .required('Required'),
    Role: yup
        .string()
        .oneOf(['User', 'Admin', 'Student', 'Lecturer'], 'Please select a valid option')
        .required('Required'),
})

export const updateStudentSchema = yup.object().shape({
    Firstname: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(20, 'Firstname must be atmost 20 characters long')
        .required('Required'),
    Lastname: yup
        .string()
        .min(2, 'Lastname must be atleast 2 characters long')
        .max(20, 'Lastname must be atmost 20 characters long')
        .required('Required'),
    Email: yup.string().email('Please enter a valid email').required('Required'),
    PhoneNumber: yup
        .string()
        .min(9, 'Phone number must be atleast 9 numbers')
        .required('Required')
        .max(15, 'Phone number must not be more than 15')
        .matches(phoneRules, { message: 'Please enter a valid phone number' }),
    Gender: yup
        .string()
        .oneOf(['Male', 'Female'], 'Please select a valid option')
        .required('Required'),
    RegNo: yup
        .string()
        .min(2, 'Firstname must be atleast 2 characters long')
        .max(20, 'Firstname must be atmost 10 characters long')
        .required('Required'),
    Role: yup
        .string()
        .oneOf(['User', 'Admin', 'Student', 'Lecturer'], 'Please select a valid option')
        .required('Required'),
})
