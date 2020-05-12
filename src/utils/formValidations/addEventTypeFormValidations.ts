import {
    validateEventName,
    validateEventDurationId,
    validateCustomMins,
} from './index'

export function AddEventTypeFormValidations() {
    const validations = new Map()
    validations.set('validateeventName', validateEventName)
    validations.set('validateeventDurationId', validateEventDurationId)
    validations.set('validatecustomMins', validateCustomMins)

    return validations
}
