import * as Yup from 'yup';

const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
const upperCasePattern = /[A-Z]/;
const lowerCasePattern = /[a-z]/;
const numberPattern = /[0-9]/;
const validNamePattern = /^[A-Za-z'-]+$/;
const nameRegex = /^(?=(?:.*[A-Za-z]){2,})[A-Za-z'-]+$/;

// Regular expression to match valid email addresses, excluding common domains like gmail.com, outlook.com, yahoo.com, hotmail.com, and yopmail.com
const matchEmail =
  /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|outlook\.com$|yahoo\.com$|hotmail\.com$|yopmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const containsRestrictedWords = (
  password: string,
  firstName: string,
  lastName: string,
  email: string
): boolean => {
  const lowerCasePassword = password.toLowerCase();
  const lowerCaseFirstName = firstName.toLowerCase() || null;
  const lowerCaseLastName = lastName.toLowerCase() || null;
  const lowerCaseEmail = email.toLowerCase() || null;

  return (
    !lowerCasePassword.includes(`${lowerCaseFirstName}`) &&
    !lowerCasePassword.includes(`${lowerCaseLastName}`) &&
    !lowerCasePassword.includes(`${lowerCaseEmail}`)
  );
};

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      validNamePattern,
      'First name can only contain letters, hyphens, and apostrophes'
    )
    .required('First name is required'),
  lastName: Yup.string()
    .matches(
      validNamePattern,
      'Last name can only contain letters, hyphens, and apostrophes'
    )
    .required('Last name is required'),
  // email: Yup.string().email('Invalid Email')
  //   .matches(
  //     matchEmail,
  //     'Personal email domains like Gmail, Outlook, Yahoo are not allowed'
  //   )
  //   .required('Email is required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required')
    .test(
      'restricted-email-domains',
      'Personal email domains like Gmail, Outlook, Yahoo are not allowed',
      function (value) {
        // const matchEmail = env.isDev
        // 	? /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
        // 	: /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|outlook\.com$|yahoo\.com$|hotmail\.com$|yopmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // If the email is invalid, skip the domain check
        if (!value) return true;

        // First validate standard email format
        if (!Yup.string().email().isValidSync(value)) return true;

        // Then validate the domain using matchEmail regex
        return matchEmail.test(value);
      }
    ),
  // password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at least 64 characters')
    .required('Password is required')
    .test(
      'restricted-words-check',
      'Password should not contain your first name, last name, or email',
      function (value) {
        const { firstName, lastName, email } = this.parent;
        return value
          ? containsRestrictedWords(value, firstName, lastName, email)
          : true;
      }
    )
    .matches(specialCharPattern, ' ')
    .matches(upperCasePattern, ' ')
    .matches(lowerCasePattern, ' ')
    .matches(numberPattern, ' '),
});
export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .matches(
      matchEmail,
      'Personal email domains like Gmail, Outlook, Yahoo are not allowed'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Password is required')
    .max(64, 'Password must be at least 64 characters')
    .required('Password is required')
    // .matches(
    //   specialCharPattern,
    //   "Password must contain at least one special character"
    // )
    .matches(
      upperCasePattern,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      lowerCasePattern,
      'Password must contain at least one lowercase letter'
    )
    .matches(numberPattern, 'Password must contain at least one number'),
});
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at least 64 characters')
    .required('Password is required')
    .matches(
      specialCharPattern,
      'Password must contain at least one special character'
    )
    .matches(
      upperCasePattern,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      lowerCasePattern,
      'Password must contain at least one lowercase letter'
    )
    .matches(numberPattern, 'Password must contain at least one number'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required')
    .max(64, 'Password must be at least 64 characters')
    .matches(
      specialCharPattern,
      'Password must contain at least one special character'
    )
    .matches(
      upperCasePattern,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      lowerCasePattern,
      'Password must contain at least one lowercase letter'
    )
    .matches(numberPattern, 'Password must contain at least one number'),
});
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('This field is required')
    .min(8, 'Old password must be at least 8 characters')
    .max(64, 'Password must be at least 64 characters')
    .matches(
      specialCharPattern,
      'Password must contain at least one special character'
    )
    .matches(
      upperCasePattern,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      lowerCasePattern,
      'Password must contain at least one lowercase letter'
    )
    .matches(numberPattern, 'Password must contain at least one number'),
  newPassword: Yup.string()
    .required('This field is required')
    .min(8, 'New password must be at least 8 characters')
    .max(64, 'Password must be at least 64 characters')
    .matches(
      specialCharPattern,
      'Password must contain at least one special character'
    )
    .matches(
      upperCasePattern,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      lowerCasePattern,
      'Password must contain at least one lowercase letter'
    )
    .matches(numberPattern, 'Password must contain at least one number'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Confirm password must match')
    .required('This field is required')
    .max(64, 'Password must be at least 64 characters')
    .matches(
      specialCharPattern,
      'Password must contain at least one special character'
    )
    .matches(
      upperCasePattern,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      lowerCasePattern,
      'Password must contain at least one lowercase letter'
    )
    .matches(numberPattern, 'Password must contain at least one number'),
});
export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
});
export const requestDemoSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      validNamePattern,
      'First name can only contain letters, hyphens, and apostrophes'
    )
    .required('First name is required'),
  lastName: Yup.string()
    .matches(
      validNamePattern,
      'Last name can only contain letters, hyphens, and apostrophes'
    )
    .required('Last name is required'),
  companyName: Yup.string().required('Company name is required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required')
    .test(
      'restricted-email-domains',
      'Personal email domains like Gmail, Outlook, Yahoo are not allowed',
      function (value) {
        // If the email is invalid, skip the domain check
        if (!value) return true;

        // First validate standard email format
        if (!Yup.string().email().isValidSync(value)) return true;

        // Then validate the domain using matchEmail regex
        return matchEmail.test(value);
      }
    ),
  interests: Yup.array()
    .of(Yup.string().required('Interest cannot be empty'))
    .required('At least one interest is required')
    .min(1, 'At least one interest is required'),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .min(6, 'otp must be at least 10 characters')
    .required('otp is required'),
});

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid Email')
    .matches(
      matchEmail,
      'Personal email domains like Gmail, Outlook, Yahoo are not allowed'
    )
    .required('Email is required'),
  phoneNumber: Yup.string()
    .min(6, 'Phone must be at least 10 characters')
    .required('Phone number is required'),
});

export const teamMemberSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(
      validNamePattern,
      'Only letters, hyphens, and apostrophes are allowed.'
    )
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(
      validNamePattern,
      'Only letters, hyphens, and apostrophes are allowed.'
    )
    .required('First name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .matches(matchEmail, 'Email is invalid')
    .required('Email is required'),
  agentAccess: Yup.array()
    .of(
      Yup.string().required(
        'You must select at least one agent for each team member'
      )
    )
    .required('You must select at least one agent for each team member')
    .min(1, 'You must select at least one agent for each team member'),
});

export const organizationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  industry: Yup.string().required('Industry is required'),
  country: Yup.string().required('Country is required'),
  addressLine1: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string().required('Postal code is required'),
  licenseNumber: Yup.string().required('License number is required'),
  taxId: Yup.string().required('Tax Id number is required'),
});

export const noteSchema = Yup.object().shape({
  note: Yup.string(),
});
export const messageSchema = Yup.object().shape({
  description: Yup.string().required(),
});
export const roleSchema = Yup.object().shape({
  name: Yup.string().required('Role name is required'),
  permissions: Yup.array()
    .of(Yup.string().required('You must select at least one Access level '))
    .required('You must select at least one Access level ')
    .min(1, 'You must select at least one Access level '),
});

export const fibonacciTeamSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      validNamePattern,
      'Only letters, hyphens, and apostrophes are allowed.'
    )
    .required('First name is required'),
  lastName: Yup.string()
    .matches(
      validNamePattern,
      'Only letters, hyphens, and apostrophes are allowed.'
    )
    .required('Last name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .matches(matchEmail, 'Email is invalid')
    .required('Email is required'),
  roleId: Yup.string().required('Role is required'),
});

export const roleDeleteSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
});
export const escalateTransactionSchema = Yup.object().shape({
  escalateTo: Yup.string().required('Role is required'),
  reason: Yup.string().required('Reason is required'),
});

export const noteTransactionSchema = Yup.object().shape({
  note: Yup.string().required('Note is required'),
});

export const fibonacciDownloadReportSchema = Yup.object().shape({
  reportType: Yup.string().required('Report type is required'),
  documentType: Yup.string().required('Report format is required'),
  startDate: Yup.string().required('Starting date is required'),
  endDate: Yup.string().required('Ending date is required'),
});
export const dianaDownloadReportSchema = Yup.object().shape({
  documentType: Yup.string().required('Report format is required')
});


export const creditAnalysisSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(nameRegex, 'Enter a valid first name'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(nameRegex, 'Enter a valid last name'),
  password: Yup.string(),
  bvn: Yup.string()
    .required('BVN is required')
    .min(11, 'BVN must be at least 11 digits')
    .max(11, 'BVN must be at most 11 digits'),
  loanAmount: Yup.number()
    .typeError('Loan amount must be a number')
    .required('Loan amount is required')
    .positive('Loan amount must be greater than zero'),
  loanType: Yup.string().required('Loan type is required'),
  recipientType: Yup.string()
    .oneOf(["business", "individual"], "Recipient type must be either 'Business' or 'Individual'")
    .required("Recipient type is required"),
  file: Yup.mixed().required("File is required"),
  loanDurationInMonths: Yup.number()
    .typeError('Loan duration in months must be a number')
    .min(0, 'Loan duration in months must not be negative'),
  loanDurationInYears: Yup.number()
    .typeError('Loan duration in years must be a number')
    .min(0, 'Loan duration in years must not be negative'),
}).test(
  'loan-duration-required',
  'Loan duration must be greater than 0 (either months or years)',
  function (value) {
    const { loanDurationInMonths, loanDurationInYears } = value;

    if ((loanDurationInMonths ?? 0) === 0 && (loanDurationInYears ?? 0) === 0) {
      return this.createError({
        path: 'loanDurationInMonths', 
        message: 'Either loan duration in months or years must be greater than 0',
      });
    }

    return true;
  }
);




export const editAnalysisSchema = Yup.object().shape({
  loanAmount: Yup.string().required('Loan amount is required'),
  loanType: Yup.string().required('Loan type is required'),
  loanDuration: Yup.string().required('Loan duration is required'),
});
