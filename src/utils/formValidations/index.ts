import { VALID_EMAIL_REGEX, VALID_PASSWORD_REGEX } from './validationRegex'

export const validateEmail = (input: string) => {
    let result = {
        flag: false,
        message: '',
    }
    if (input) {
        if (!VALID_EMAIL_REGEX.test(input)) {
            result.message = 'Please enter valid email-id'
            result.flag = true
        }
    } else {
        result.message = 'Please enter email-id'
        result.flag = true
    }
    return result
}

export const validateFullName = (input: string) => {
    let result = {
        flag: false,
        message: '',
    }
    if (!input) {
        result.message = 'Please enter first name'
        result.flag = true
    }
    return result
}

export const validatePassword = (input: string) => {
    let result = {
        flag: false,
        message: '',
    }
    if (input) {
        if (!VALID_PASSWORD_REGEX.test(input)) {
            result.message =
                'Plese enter valid password format. At least one uppercase, one lowercase, one number and one special character and no whitespace'
            result.flag = true
        }
    } else {
        result.message = 'Please enter new password'
        result.flag = true
    }
    return result
}

export const validateConfirmPassword = (
    input: string,
    matchedInput: string
) => {
    let result = {
        flag: false,
        message: '',
    }
    if (input) {
        if (input !== matchedInput) {
            result.message =
                'Confirm password is not matching with new password.'
            result.flag = true
        }
    } else {
        result.message = 'Please enter confirm password'
        result.flag = true
    }
    return result
}
