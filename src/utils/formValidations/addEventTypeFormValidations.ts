import {
    validateEventName,
    validateEventMins,
    validateCustomMins,
} from './index'

export function AddEventTypeFormValidations() {
    const validations = new Map()
    validations.set('validateeventName', validateEventName)
    validations.set('validateeventMins', validateEventMins)
    validations.set('validatecustomMins', validateCustomMins)

    return validations
}
