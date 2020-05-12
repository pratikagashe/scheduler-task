import React, { useState } from 'react'
import {
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    TextField,
} from '@material-ui/core'
import './addEventTypes.scss'
import { Redirect } from 'react-router-dom'
import { useForm } from '../../utils/customHooks'
import { AddEventTypeFormValidations } from '../../utils/formValidations/addEventTypeFormValidations'
import $ from 'jquery'

const eventDuration = [
    { id: 1, mins: '15' },
    { id: 2, mins: '30' },
    { id: 3, mins: '45' },
    { id: 4, mins: '60' },
]

interface IDuration {
    id: number
    mins: string
}

interface IAddEventType {
    eventName: string
    eventDuration: string
    customMins: string
}

const formValidations = AddEventTypeFormValidations()

const AddEventType: React.FunctionComponent = () => {
    const [formStatus, setFormStatus] = useState('')
    const [redirectToEventType, setRedirectToEventType] = useState(false)

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
            eventName: '',
            eventMins: '',
            customMins: '',
        },
        onSubmit({ values, e }: any) {
            if (allowSubmit) {
                submitAddEventTypeForm()
            }
        },
        validate(values: IAddEventType) {
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

    const submitAddEventTypeForm = () => {
        fetch('http://www.mocky.io/v2/5eb79e9f3100000d00c8a1ec', {
            method: 'post',
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status === 200) {
                    let cachedEventTypes: any = localStorage.getItem(
                        'eventTypes'
                    )
                    let newEventType
                    if (cachedEventTypes) {
                        cachedEventTypes = JSON.parse(cachedEventTypes)
                        newEventType = {
                            id: cachedEventTypes.length + 1,
                            name: values.eventName,
                            duration: values.eventMins,
                        }
                    } else {
                        newEventType = {
                            id: 1,
                            name: values.eventName,
                            duration: values.eventMins,
                        }
                    }
                    cachedEventTypes.push(newEventType)
                    localStorage.setItem(
                        'eventTypes',
                        JSON.stringify(cachedEventTypes)
                    )
                    setFormStatus('New event type added successfully')
                    clearAddEventTypeForm()
                } else {
                    setFormStatus('Something went wrong. Please try again')
                }
            })
            .catch((error) => {
                console.error(error)
                setFormStatus('Something went wrong. Please try again')
            })
    }

    const clearAddEventTypeForm = () => {
        $('.duration').removeClass('active')
        setValues({
            eventName: '',
            eventMins: '',
            customMins: '',
        })
    }

    const selectDuration = (mins: string, id: number) => {
        $('.duration').removeClass('active')
        $('#duration' + id).addClass('active')
        setValues({
            ...values,
            eventMins: mins,
            customMins: '',
        })
    }

    if (redirectToEventType) {
        return <Redirect to="/dashboard/" />
    }

    return (
        <div className="addEventTypes">
            <div className="wrapper">
                <div className="header">
                    <Button
                        variant="outlined"
                        className="actionBtn"
                        onClick={() => setRedirectToEventType(true)}
                    >
                        Back
                    </Button>
                    <div className="title">
                        <h4>Add Event Type</h4>
                    </div>
                </div>
                {formStatus && <h4 className="formStatus">{formStatus}</h4>}
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="addEventTypeContainer"
                    >
                        <Card variant="elevation" elevation={3}>
                            <form>
                                <CardContent>
                                    <div className="formElement">
                                        <label>Event Name *</label>
                                        <TextField
                                            variant="outlined"
                                            id="eventName"
                                            name="eventName"
                                            placeholder="Enter event type"
                                            value={values.eventName}
                                            error={
                                                errors.eventName &&
                                                touchedValues.eventName
                                            }
                                            helperText={
                                                errors.eventName &&
                                                'Enter event name'
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="formElement">
                                        <label>Event Duration *</label>
                                        {eventDuration &&
                                            eventDuration.length > 0 &&
                                            eventDuration.map(
                                                (
                                                    duration: IDuration,
                                                    index: number
                                                ) => (
                                                    <div
                                                        className="duration"
                                                        id={`duration${duration.id}`}
                                                        key={`duration${index}`}
                                                        onClick={() =>
                                                            selectDuration(
                                                                duration.mins,
                                                                duration.id
                                                            )
                                                        }
                                                    >
                                                        <p>{duration.mins}</p>
                                                        <span>mins</span>
                                                    </div>
                                                )
                                            )}
                                        <div
                                            className="duration"
                                            id="customDuration"
                                        >
                                            <input
                                                id="customMins"
                                                name="customMins"
                                                onChange={handleChange}
                                                value={values.customMins}
                                                onBlur={handleBlur}
                                            />
                                            <span>Custom mins</span>
                                        </div>
                                        {errors.eventMins && (
                                            <p className="errorText">
                                                Please choose event duration
                                            </p>
                                        )}
                                        {errors.customMins && (
                                            <p className="errorText">
                                                Please enter valid mins. Only
                                                numbers, below 60
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button>Cancel</Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default AddEventType
