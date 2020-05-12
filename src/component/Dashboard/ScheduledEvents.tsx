import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import './addEventTypes.scss'

const eventDuration = [
    { id: 1, mins: '15' },
    { id: 2, mins: '30' },
    { id: 3, mins: '45' },
    { id: 4, mins: '60' },
]

const ScheduledEvents: React.FunctionComponent = () => {
    return (
        <div className="ScheduledEventss">
            <div className="wrapper">
                <div className="header">
                    <div className="title">
                        <h4>Add Event Type</h4>
                    </div>
                </div>
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
                        className="ScheduledEventsContainer"
                    >
                        <Paper variant="elevation" elevation={3}></Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ScheduledEvents
