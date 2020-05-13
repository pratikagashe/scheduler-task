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
        result.message = 'Please enter full name'
        result.flag = true
    }
    return result
}

export const validateFirstName = (input: string) => {
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

export const validateLastName = (input: string) => {
    let result = {
        flag: false,
        message: '',
    }
    if (!input) {
        result.message = 'Please enter last name'
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

export const validateEventName = (input: string) => {
    let result = {
        flag: false,
        message: '',
    }
    if (!input) {
        result.message = 'Please enter event name'
        result.flag = true
    }
    return result
}

export const validateEventDurationId = (input: number, customMins: string) => {
    let result = {
        flag: false,
        message: '',
    }
    if (input === 0 && customMins === '') {
        result.message = 'Please choose or enter custom mins'
        result.flag = true
    }
    return result
}

export const validateCustomMins = (input: string) => {
    let result = {
        flag: false,
        message: '',
    }
    const mins = parseInt(input)
    if (mins > 60) {
        result.message = 'Please enter valid custom min. Numeric only. Below 60'
        result.flag = true
    }
    return result
}
