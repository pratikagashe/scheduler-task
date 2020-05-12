import React, { useState, useEffect } from 'react'
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
import { eventDuration } from '../../utils/constant'

interface IDuration {
    id: number
    mins: string
}

interface IAddEventType {
    eventName: string
    eventDurationId: number
    customMins: string
}

const formValidations = AddEventTypeFormValidations()

const AddEventType: React.FunctionComponent = (props: any) => {
    const [formStatus, setFormStatus] = useState('')
    const [redirectToEventType, setRedirectToEventType] = useState(false)

    useEffect(() => {
        if (props) {
            editEventType(props.match.params.id)
        }
    }, [])

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
            eventDurationId: 0,
            customMins: '',
        },
        onSubmit({ values, e }: any) {
            if (allowSubmit) {
                if (props.match.params.id) {
                    submitEditEventTypeForm(parseInt(props.match.params.id))
                } else {
                    submitAddEventTypeForm()
                }
            }
        },
        validate(values: IAddEventType) {
            const formErrors: any = {}
            let errorArray = []
            let allowFormSubmit = false
            Object.entries(values).forEach(([key, value]) => {
                if (formValidations.has(`validate${key}`)) {
                    let result = null
                    if (key === 'eventDurationId') {
                        result = formValidations.get(`validate${key}`)(
                            value,
                            values.customMins
                        )
                    } else {
                        result = formValidations.get(`validate${key}`)(value)
                    }
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

    const editEventType = (eventId: number) => {
        if (eventId) {
            let cachedEventTypes: any = localStorage.getItem('eventTypes')
            cachedEventTypes = JSON.parse(cachedEventTypes)
            const eventTypeDetail = cachedEventTypes.filter(
                (eventType: any) => {
                    return eventType.id.toString() === eventId.toString()
                }
            )
            setValues({
                eventName: eventTypeDetail[0].name,
                eventDurationId: eventTypeDetail[0].duration,
                customMins: eventTypeDetail[0].customMins,
            })
            if (eventTypeDetail[0].customMins) {
                $('#customDuration').addClass('active')
            } else {
                $('#duration' + eventTypeDetail[0].durationId).addClass(
                    'active'
                )
            }
        }
    }

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
                            durationId: values.eventDurationId,
                            customMins: values.customMins,
                        }
                    } else {
                        newEventType = {
                            id: 1,
                            name: values.eventName,
                            durationId: values.eventDurationId,
                            customMins: values.customMins,
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

    const submitEditEventTypeForm = (eventId: number) => {
        fetch('http://www.mocky.io/v2/5eb79e9f3100000d00c8a1ec', {
            method: 'post',
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status === 200) {
                    let cachedEventTypes: any = localStorage.getItem(
                        'eventTypes'
                    )
                    cachedEventTypes = JSON.parse(cachedEventTypes)
                    let updatedEventType = {
                        id: eventId,
                        name: values.eventName,
                        durationId: values.eventDurationId,
                        customMins: values.customMins,
                    }
                    cachedEventTypes[eventId - 1] = updatedEventType
                    localStorage.setItem(
                        'eventTypes',
                        JSON.stringify(cachedEventTypes)
                    )
                    setFormStatus('Event edited successfully')
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
            eventDurationId: 0,
            customMins: '',
        })
    }

    const selectDuration = (mins: string, id: number) => {
        $('.duration').removeClass('active')
        $('#duration' + id).addClass('active')
        setValues({
            ...values,
            eventDurationId: id,
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
                                        {errors.eventDurationId && (
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
