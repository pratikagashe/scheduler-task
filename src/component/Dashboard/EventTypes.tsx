import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid, Card, CardContent, CardActions } from '@material-ui/core'
import { dummyEventTypes, eventDuration } from '../../utils/constant'
import './eventTypes.scss'

interface IEventType {
    id: number
    name: string
    durationId: number
    customMins: string
}

const EventTypes: React.FunctionComponent = () => {
    const [eventTypes, setEventTypes] = useState<Array<IEventType> | null>()
    const [redirectToAddEventType, setRedirectToAddEventType] = useState(false)

    useEffect(() => {
        getEventTypes()
    }, [])

    const getEventTypes = () => {
        const cachedEventTypes: any = localStorage.getItem('eventTypes')
        if (cachedEventTypes) {
            setEventTypes(JSON.parse(cachedEventTypes))
        } else {
            localStorage.setItem('eventTypes', JSON.stringify(dummyEventTypes))
            setEventTypes(dummyEventTypes)
        }
    }

    if (redirectToAddEventType) {
        return <Redirect to="/add-event-type/" />
    }

    return (
        <div className="eventTypes">
            <div className="header">
                <div className="title">
                    <h4>My Link</h4>
                    <Link to="/dashboard/">booking.com/jonh-doe-booking</Link>
                </div>
                <div className="actionBtn">
                    <Button
                        variant="outlined"
                        onClick={() => setRedirectToAddEventType(true)}
                    >
                        + New Event Type
                    </Button>
                </div>
            </div>
            <Grid
                container
                justify="space-between"
                alignItems="center"
                spacing={2}
            >
                {eventTypes &&
                    eventTypes.length > 0 &&
                    eventTypes.map((event: IEventType) => {
                        let minutes
                        if (event.customMins) {
                            minutes = event.customMins
                        } else if (
                            eventDuration &&
                            eventDuration[event.durationId - 1]
                        ) {
                            minutes = eventDuration[event.durationId - 1].mins
                                ? eventDuration[event.durationId - 1].mins
                                : '00'
                        }
                        return (
                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={6}
                                xs={12}
                                key={`event${event.id}`}
                                className="eventTypeContainer"
                            >
                                <Card variant="elevation" elevation={3}>
                                    <CardContent>
                                        <div className="eventTypeHeader">
                                            <h3>{event.name}</h3>
                                            <p>{`${minutes} mins`}</p>
                                        </div>
                                    </CardContent>
                                    <CardActions>
                                        <Link
                                            to={`/edit-event-type/${event.id}/`}
                                        >
                                            Edit
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
            </Grid>
        </div>
    )
}

export default EventTypes
