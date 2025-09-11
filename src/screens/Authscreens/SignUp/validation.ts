import * as yup from 'yup';

// Validation schema for SignUp form with tab-based design
export const signUpValidationSchema = yup.object().shape({
  inputValue: yup
    .string()
    .required('This field is required')
    .when('selectedTab', {
      is: 'email',
      then: schema => schema.email('Please enter a valid email address'),
      otherwise: schema =>
        schema.matches(
          /^[\+]?[1-9][\d]{0,15}$/,
          'Please enter a valid phone number',
        ),
    }),
  firstName: yup
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .required('Last name is required'),
  password: yup
    .string()
    // .min(8, 'Password must be at least 8 characters')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    // )
    .required('Password is required'),
});

// Custom validation to ensure at least one contact method is provided
export const validateAtLeastOneContact = (
  email: string,
  phone: string,
  selectedTab: string,
) => {
  if (!email && !phone) {
    return selectedTab == 'email'
      ? 'Please enter you email address'
      : 'Please enter your phone number';
  }
  return null;
};

// Separate validation functions for email and phone
export const validateEmail = (email: string) => {
  if (!email) return null;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhone = (phone: string) => {
  if (!phone) return null;
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};
