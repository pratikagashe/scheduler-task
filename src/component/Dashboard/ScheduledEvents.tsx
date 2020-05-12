import React, { useState } from 'react'
import { Grid, Paper, Tabs, Tab } from '@material-ui/core'
import './scheduledEvents.scss'
import { dummyScheduledEvents } from '../../utils/constant'
import { IScheduledEventList, ITaskList } from '../../utils/interface'
import { formatDate, formatTime } from '../../utils/common'

const ScheduledEvents: React.FunctionComponent = () => {
    const [value, setValue] = useState(0)

    const handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setValue(newValue)
    }

    return (
        <div className="scheduledEvents">
            <div className="wrapper">
                <div className="header">
                    <div className="eventCount">
                        <span>Displaying 3 of 3 events</span>
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
                        className="scheduledEventsContainer"
                    >
                        <Paper variant="elevation" elevation={3}>
                            <Tabs value={value} onChange={handleTabChange}>
                                <Tab label="Upcoming" />
                                <Tab label="Past" />
                            </Tabs>
                            {dummyScheduledEvents &&
                                dummyScheduledEvents.length > 0 &&
                                dummyScheduledEvents.map(
                                    (
                                        event: IScheduledEventList,
                                        index: number
                                    ) => (
                                        <div
                                            className="perDaySchedule"
                                            key={`perDaySchedule${index}`}
                                        >
                                            <div className="dateBlock">
                                                <p>
                                                    <strong>
                                                        {formatDate(
                                                            event.eventDate
                                                        )}
                                                    </strong>
                                                </p>
                                            </div>
                                            <div className="scheduleOfDay">
                                                {event.taskList &&
                                                    event.taskList.length > 0 &&
                                                    event.taskList.map(
                                                        (
                                                            task: ITaskList,
                                                            taskIndex: number
                                                        ) => (
                                                            <Grid
                                                                container
                                                                justify="space-between"
                                                                alignItems="flex-start"
                                                                className="scheduleTask"
                                                                spacing={2}
                                                                key={`scheduleTask${taskIndex}`}
                                                            >
                                                                <Grid
                                                                    item
                                                                    lg={4}
                                                                    md={4}
                                                                    sm={12}
                                                                    xs={12}
                                                                >
                                                                    <p>
                                                                        <strong>
                                                                            {formatTime(
                                                                                task
                                                                                    .timing
                                                                                    .startTime
                                                                            )}
                                                                            {
                                                                                ' - '
                                                                            }
                                                                            {formatTime(
                                                                                task
                                                                                    .timing
                                                                                    .endTime
                                                                            )}
                                                                        </strong>
                                                                    </p>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    lg={8}
                                                                    md={8}
                                                                    sm={12}
                                                                    xs={12}
                                                                >
                                                                    <p>
                                                                        <strong>
                                                                            {
                                                                                task
                                                                                    .details
                                                                                    .eventName
                                                                            }
                                                                        </strong>
                                                                    </p>
                                                                    <p>
                                                                        Event
                                                                        Type{' '}
                                                                        <strong>
                                                                            {
                                                                                task
                                                                                    .details
                                                                                    .eventType
                                                                            }
                                                                        </strong>
                                                                    </p>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    )
                                )}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ScheduledEvents
