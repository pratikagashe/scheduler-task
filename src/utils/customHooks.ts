import { useState } from 'react'
import $ from 'jquery'

export const useToggle = (initialValue: boolean): [boolean, Function] => {
    const [value, setValue] = useState(initialValue)
    const toggle = () => setValue(!value)
    return [value, toggle]
}

export const useBoolean = (
    initialValue: boolean
): [boolean, Function, Function] => {
    const [value, setValue] = useState(initialValue)

    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)

    return [value, setTrue, setFalse]
}

export const useForm = ({ initialValues, onSubmit, validate }: any): any => {
    const [values, setValues] = useState(initialValues || {})
    const [touchedValues, setTouchedValues] = useState({})
    const [errors, setErrors] = useState({})
    const [allowSubmit, setAllowSubmit] = useState(false)

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value
        if (name === 'customMins') {
            $('.duration').removeClass('active')
            $('#customDuration').addClass('active')
            setValues({
                ...values,
                [name]: value,
                eventDurationId: 0,
            })
        } else {
            setValues({
                ...values,
                [name]: value,
            })
        }
    }
    const handleBlur = (event: any) => {
        const target = event.target
        const name = target.name
        setTouchedValues({
            ...touchedValues,
            [name]: true,
        })
        const { formErrors, allowFormSubmit } = validate(values)
        setErrors({
            ...errors,
            ...formErrors,
        })
        setAllowSubmit(allowFormSubmit)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const { formErrors, allowFormSubmit } = validate(values)
        setErrors({
            ...errors,
            ...formErrors,
        })
        setAllowSubmit(allowFormSubmit)
        if (allowFormSubmit) {
            onSubmit({ values, formErrors })
        }
    }

    return {
        values,
        touchedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setValues,
        allowSubmit,
    }
}
