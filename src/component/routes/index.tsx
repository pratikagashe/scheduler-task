import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Nav from '../Header/Nav'
import ForgetPassword from '../Auth/ForgetPassword'
import ResetPassword from '../Auth/ResetPassword'

import Dashboard from '../Dashboard/index'
import AddEventType from '../Dashboard/AddEventType'
import { UserContext } from '../Context'

const AppRoutes: React.FunctionComponent = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)

    setTimeout(() => {
        checkSession()
    })

    const checkSession = () => {
        const token = localStorage.getItem('token')
        if (token === 'valid token') {
            setCurrentUser({
                email: 'demo@email.com',
                fullName: 'John Doe',
                isLoggedIn: true,
            })
        }
    }

    return (
        <BrowserRouter basename="/">
            <Route component={Nav} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/sign-up/" component={SignUp} />
                <Route exact path="/login/" component={Login} />
                <Route
                    exact
                    path="/forget-password/"
                    component={ForgetPassword}
                />
                <Route
                    exact
                    path="/reset-password/"
                    component={ResetPassword}
                />
                <Route exact path="/dashboard/" component={Dashboard} />
                {currentUser.isLoggedIn && (
                    <>
                        <Route
                            exact
                            path="/add-event-type/"
                            component={AddEventType}
                        />
                        <Route
                            exact
                            path="/edit-event-type/:id"
                            component={AddEventType}
                        />
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}

export default AppRoutes
