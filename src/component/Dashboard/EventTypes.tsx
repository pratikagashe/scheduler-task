import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid, Card, CardContent, CardActions } from '@material-ui/core'
import './eventTypes.scss'

const dummyEventTypes = [
    {
        id: 1,
        name: 'Demo call',
        duration: '30 mins',
    },
    {
        id: 2,
        name: 'Technical call',
        duration: '60 mins',
    },
    {
        id: 3,
        name: 'Account review',
        duration: '30 mins',
    },
]

interface IEventType {
    id: number
    name: string
    duration: string
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
                    eventTypes.map((event: IEventType) => (
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
                                        <p>{event.duration}</p>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Link to="/dashboard/">Edit</Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
    )
}

export default EventTypes
