import React, { useState, useContext } from 'react'
import { Grid, IconButton, Button } from '@material-ui/core'
import { ChevronLeft, Schedule, CalendarToday } from '@material-ui/icons'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { IMeetingConfiguration } from '../../utils/interface'
import { UserContext } from '../Context'
import { eventDuration } from '../../utils/constant'
import { getTaskDateTime, formatDate, formatTime } from '../../utils/common'
import EnterDetails from './EnterDetails'

const MeetingConfiguration: React.FunctionComponent<IMeetingConfiguration> = ({
    eventType,
    hideConfiguration,
    taskDetails,
    setTaskDetails,
}) => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [showEnterDetails, setShowEnterDetails] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedTime, setSelectedTime] = useState<Date>(
        setMinutes(new Date(), 0)
    )
    const [formError, setFormError] = useState('')

    const minutes = eventType.customMins
        ? eventType.customMins
        : eventDuration[eventType.durationId - 1].mins
        ? eventDuration[eventType.durationId - 1].mins
        : '00'

    const handleDayClick = (date: Date) => {
        setSelectedDate(date)
    }

    const handleTimeSelect = (date: Date) => {
        setSelectedTime(date)
    }

    const enterDetails = () => {
        const today = new Date()
        if (today > selectedTime) {
            setFormError('Please choose valid time')
        } else {
            setFormError('')
            const taskDateTime = getTaskDateTime(
                selectedDate,
                selectedTime,
                parseInt(minutes)
            )
            setTaskDetails({
                ...taskDetails,
                timing: taskDateTime,
            })
            setShowEnterDetails(true)
        }
    }

    return (
        <Grid
            container
            spacing={3}
            alignItems="flex-start"
            justify="space-evenly"
        >
            <Grid item lg={4} md={4} sm={12} xs={12} className="paddingWrapper">
                <IconButton onClick={() => hideConfiguration()}>
                    <ChevronLeft />
                </IconButton>
                {eventType && (
                    <div className="meetingTypeDetails">
                        <p>{currentUser.fullName}</p>
                        <h3>{eventType.name}</h3>
                        <label>
                            <Schedule /> <span>{minutes} mins</span>
                        </label>
                        {taskDetails &&
                            taskDetails.timing &&
                            taskDetails.timing.startTime && (
                                <label className="greenText">
                                    <CalendarToday />
                                    <span>
                                        {formatTime(
                                            taskDetails.timing.startTime
                                        )}
                                        {' - '}
                                        {formatTime(taskDetails.timing.endTime)}
                                        {', '}
                                        {formatDate(
                                            taskDetails.timing.startTime
                                        )}
                                    </span>
                                </label>
                            )}
                    </div>
                )}
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12} className="paddingWrapper">
                {showEnterDetails ? (
                    <EnterDetails
                        eventType={eventType}
                        taskDetails={taskDetails}
                        setTaskDetails={setTaskDetails}
                    />
                ) : (
                    <>
                        <div className="dateTimeSelection">
                            <DayPicker
                                onDayClick={handleDayClick}
                                selectedDays={selectedDate}
                                disabledDays={[
                                    new Date(2020, 4, 18),
                                    new Date(2020, 4, 22),
                                    new Date(2020, 4, 27),
                                    {
                                        before: new Date(),
                                    },
                                    {
                                        daysOfWeek: [0, 6],
                                    },
                                ]}
                            />
                            <DatePicker
                                selected={selectedTime}
                                onChange={handleTimeSelect}
                                inline
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                minTime={setHours(
                                    setMinutes(new Date(), 0),
                                    10
                                )}
                                maxTime={setHours(
                                    setMinutes(new Date(), 0),
                                    19
                                )}
                                excludeTimes={[
                                    setHours(setMinutes(new Date(), 0), 13),
                                    setHours(setMinutes(new Date(), 15), 13),
                                    setHours(setMinutes(new Date(), 30), 13),
                                    setHours(setMinutes(new Date(), 30), 16),
                                    setHours(setMinutes(new Date(), 45), 16),
                                ]}
                            />
                        </div>
                        {formError && <p className="errorText">{formError}</p>}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={enterDetails}
                        >
                            Continue
                        </Button>
                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default MeetingConfiguration
