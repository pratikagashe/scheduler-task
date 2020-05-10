import { validateEmail, validatePassword } from './index'

export function LoginFormValidations() {
    const validations = new Map()
    validations.set('validateemail', validateEmail)
    validations.set('validatepassword', validatePassword)

    return validations
}
