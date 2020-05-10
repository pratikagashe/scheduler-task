import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from './index'

export function ResetPasswordFormValidations() {
    const validations = new Map()
    validations.set('validateemail', validateEmail)
    validations.set('validatepassword', validatePassword)
    validations.set('validateconfirmPassword', validateConfirmPassword)

    return validations
}
