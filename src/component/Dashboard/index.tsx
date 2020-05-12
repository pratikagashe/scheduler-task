import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Context'
import { Redirect } from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import EventTypes from './EventTypes'
import ScheduledEvents from './ScheduledEvents'

const Dashboard: React.FunctionComponent = () => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [redirectToHome, setRedirectToHome] = useState(false)
    const [value, setValue] = useState(1)

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            setRedirectToHome(true)
        }
    }, [currentUser])

    const handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setValue(newValue)
    }

    if (redirectToHome && !currentUser.isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div className="dashboard">
            <AppBar position="static" color="inherit">
                <div className="wrapper">
                    <h1>My Schedule</h1>
                    <Tabs value={value} onChange={handleTabChange}>
                        <Tab label="Event Types" />
                        <Tab label="Schedules Types" />
                    </Tabs>
                </div>
            </AppBar>
            <div className="wrapper dashboardBody">
                {value === 0 && <EventTypes />}
                {value === 1 && <ScheduledEvents />}
            </div>
        </div>
    )
}

export default Dashboard
