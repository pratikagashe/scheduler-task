import { validateFirstName, validateLastName, validateEmail } from './index'

export function EnterDetailsFormValidations() {
    const validations = new Map()
    validations.set('validatefirstName', validateFirstName)
    validations.set('validatelastName', validateLastName)
    validations.set('validateemail', validateEmail)

    return validations
}
