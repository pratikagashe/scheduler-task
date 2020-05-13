import React, { useContext, useState } from 'react'
import './scheduleMeeting.scss'
import { UserContext } from '../Context'
import { IEventType, ITaskList } from '../../utils/interface'
import { ChevronRight } from '@material-ui/icons'
import { IconButton, Paper } from '@material-ui/core'
import { useBoolean } from '../../utils/customHooks'
import MeetingConfiguration from './MeetingConfiguration'

const ScheduleMeeting: React.FunctionComponent = () => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [eventTypes, setEventTypes] = useState<Array<IEventType> | null>()
    const [configureEvent, setConfigureEvent] = useState<IEventType | null>()
    const [
        isConfigurationVisible,
        showConfiguration,
        hideConfiguration,
    ] = useBoolean(false)
    const [taskDetails, setTaskDetails] = useState<ITaskList>({
        timing: {
            startTime: '',
            endTime: '',
        },
        details: {
            eventName: '',
            eventType: '',
        },
    })

    setTimeout(() => {
        getEventTypes()
    })

    const configureMeeting = (eventType: IEventType) => {
        setConfigureEvent(eventType)
        showConfiguration()
    }

    const getEventTypes = () => {
        let cachedEventTypes: any = localStorage.getItem('eventTypes')
        cachedEventTypes = JSON.parse(cachedEventTypes)
        setEventTypes(cachedEventTypes)
    }

    return (
        <div className="scheduleMeeting">
            <div className="wrapper">
                <Paper elevation={3}>
                    <div className="header">
                        <h3>{currentUser.fullName}</h3>
                        <p>
                            Welcome to my scheduling page. Please follow the
                            instructions to add an event to my calender.
                        </p>
                    </div>
                    <div className="scheduleMeetingContainer">
                        {isConfigurationVisible ? (
                            configureEvent && (
                                <MeetingConfiguration
                                    eventType={configureEvent}
                                    hideConfiguration={hideConfiguration}
                                    taskDetails={taskDetails}
                                    setTaskDetails={setTaskDetails}
                                />
                            )
                        ) : (
                            <React.Fragment>
                                {eventTypes &&
                                    eventTypes.length > 0 &&
                                    eventTypes.map(
                                        (event: IEventType, index: number) => (
                                            <div
                                                className="scheduleMeetingType"
                                                key={`scheduleMeetingType${index}`}
                                            >
                                                <p className="bulletDesign">
                                                    {event.name}
                                                </p>
                                                <IconButton
                                                    onClick={() =>
                                                        configureMeeting(event)
                                                    }
                                                >
                                                    <ChevronRight />
                                                </IconButton>
                                            </div>
                                        )
                                    )}
                            </React.Fragment>
                        )}
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default ScheduleMeeting
