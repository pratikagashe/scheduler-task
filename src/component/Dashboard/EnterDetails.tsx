import React, { useState } from 'react'
import { Button, TextField, Grid } from '@material-ui/core'
import { EnterDetailsFormValidations } from '../../utils/formValidations/enterDetailsFormValidations'
import { useForm } from '../../utils/customHooks'
import { IEnterDetails, IEnterDetailsForm } from '../../utils/interface'
import { Redirect } from 'react-router-dom'

const formValidations = EnterDetailsFormValidations()

const EnterDetails: React.FunctionComponent<IEnterDetails> = ({
    eventType,
    taskDetails,
    setTaskDetails,
}) => {
    const [formStatus, setFormStatus] = useState('')
    const [redirectToConfirmation, setRedirectToConfirmation] = useState(false)

    // useForm for account settings form.
    const {
        values,
        touchedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setValues,
        allowSubmit,
    } = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit({ values, e }: any) {
            if (allowSubmit) {
                submitEventDetailsForm()
            }
        },
        validate(values: IEnterDetailsForm) {
            const formErrors: any = {}
            let errorArray = []
            let allowFormSubmit = false
            Object.entries(values).forEach(([key, value]) => {
                if (formValidations.has(`validate${key}`)) {
                    let result = null
                    result = formValidations.get(`validate${key}`)(value)
                    formErrors[`${key}`] = result.flag
                    formErrors[`${key}Message`] = result.message
                    if (result.flag) {
                        errorArray.push(result.flag)
                    }
                }
            })
            if (errorArray.length === 0) {
                allowFormSubmit = true
            }
            return { formErrors, allowFormSubmit }
        },
    })

    const submitEventDetailsForm = () => {
        fetch('https://www.mocky.io/v2/5eb79e9f3100000d00c8a1ec', {
            method: 'post',
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status === 200) {
                    setFormStatus('')
                    clearEnterDetailsForm()
                    setTaskDetails({
                        ...taskDetails,
                        details: {
                            eventName: values.firstName + ' ' + values.lastName,
                            eventType: eventType.name,
                        },
                    })
                    setRedirectToConfirmation(true)
                } else {
                    setFormStatus('Something went wrong. Please try again')
                }
            })
            .catch((error) => {
                console.error(error)
                setFormStatus('Something went wrong. Please try again')
            })
    }

    const clearEnterDetailsForm = () => {
        setValues({
            firstName: '',
            lastName: '',
            email: '',
        })
    }

    if (redirectToConfirmation) {
        return (
            <Redirect
                to={{ pathname: '/schedule-confirmed/', state: taskDetails }}
            />
        )
    }

    return (
        <div className="enterDetails">
            <h2>Enter Details</h2>
            <form>
                <Grid container spacing={3} justify="space-between">
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            placeholder="first name"
                            value={values.firstName}
                            error={touchedValues.firstName && errors.firstName}
                            helperText={errors.firstNameMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            placeholder="last name"
                            value={values.lastName}
                            error={touchedValues.lastName && errors.lastName}
                            helperText={errors.lastNameMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="email address"
                            value={values.email}
                            error={touchedValues.email && errors.email}
                            helperText={errors.emailMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                </Grid>
                {formStatus && <h4 className="formStatus">{formStatus}</h4>}
                <Button
                    variant="contained"
                    color="primary"
                    disabled={allowSubmit ? false : true}
                    onClick={handleSubmit}
                >
                    Schedule Event
                </Button>
            </form>
        </div>
    )
}

export default EnterDetails
