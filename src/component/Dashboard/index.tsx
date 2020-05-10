import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Context'
import { Redirect } from 'react-router-dom'

const Dashboard: React.FunctionComponent = () => {
    // eslint-disable-next-line
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [redirectToHome, setRedirectToHome] = useState(false)

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            setRedirectToHome(true)
        }
    }, [currentUser])

    if (redirectToHome && !currentUser.isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div className="wrapper">
            <h1>Welcome to Dashboard</h1>
        </div>
    )
}

export default Dashboard
