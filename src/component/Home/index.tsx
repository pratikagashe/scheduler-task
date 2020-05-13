import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Context'
import { Redirect, Link } from 'react-router-dom'

const Home: React.FunctionComponent = () => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [redirectToDashboard, setRedirectToDashboard] = useState(false)

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            setRedirectToDashboard(true)
        }
    }, [currentUser])

    if (redirectToDashboard && currentUser.isLoggedIn) {
        return <Redirect to="/dashboard/" />
    }

    return (
        <div className="wrapper">
            <h1>Welcome to Scheduler Task</h1>
            <p>
                Please <Link to="/login/">Login</Link> to access your dashboard
            </p>
        </div>
    )
}

export default Home
