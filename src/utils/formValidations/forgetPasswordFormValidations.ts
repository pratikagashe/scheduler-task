import { validateEmail } from './index'

export function ForgetPasswordFormValidations() {
    const validations = new Map()
    validations.set('validateemail', validateEmail)

    return validations
}
