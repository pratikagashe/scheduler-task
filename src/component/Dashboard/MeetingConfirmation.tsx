import React, { useContext, useState, useEffect } from 'react'
import './meetingConfirmation.scss'
import { UserContext } from '../Context'
import { CalendarToday } from '@material-ui/icons'
import { Paper } from '@material-ui/core'
import { ITaskList } from '../../utils/interface'
import { formatTime, formatDate } from '../../utils/common'
import { Link } from 'react-router-dom'

const MeetingConfirmation: React.FunctionComponent = (props: any) => {
    const [confirmedMeet, setConfirmedMeet] = useState<ITaskList | null>()

    useEffect(() => {
        let inEffect = true
        if (inEffect) {
            if (props && props.location && props.location.state) {
                setConfirmedMeet(props.location.state)
            }
            inEffect = false
        }
        // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useContext(UserContext)

    return (
        <div className="meetingConfirmation">
            <div className="wrapper">
                <Paper elevation={3}>
                    <div className="header">
                        <h3>Confirmed</h3>
                        <p>You are scheduled {currentUser.fullName}</p>
                    </div>
                    <div className="meetingConfirmationContainer">
                        {confirmedMeet && (
                            <div className="meetingConfirmationBlock">
                                <p className="bulletDesign">
                                    {confirmedMeet.details.eventType}
                                </p>
                                <label className="greenText">
                                    <CalendarToday />
                                    <span>
                                        {formatTime(
                                            confirmedMeet.timing.startTime
                                        )}
                                        {' - '}
                                        {formatTime(
                                            confirmedMeet.timing.endTime
                                        )}
                                        {', '}
                                        {formatDate(
                                            confirmedMeet.timing.startTime
                                        )}
                                    </span>
                                </label>
                            </div>
                        )}
                        <div className="meetingConfirmationBlock">
                            <Link to="/schedule-a-meeting/">
                                Schedule another event
                            </Link>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default MeetingConfirmation
