import {
    validateEmail,
    validateFullName,
    validatePassword,
    validateConfirmPassword,
} from './index'

export function SignUpFormValidations() {
    const validations = new Map()
    validations.set('validateemail', validateEmail)
    validations.set('validatefullName', validateFullName)
    validations.set('validatepassword', validatePassword)
    validations.set('validateconfirmPassword', validateConfirmPassword)

    return validations
}
