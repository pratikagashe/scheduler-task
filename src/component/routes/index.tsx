import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'
import Nav from '../Header/Nav'
import ForgetPassword from '../Auth/ForgetPassword'
import ResetPassword from '../Auth/ResetPassword'

const AppRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter basename="/">
            <Route component={Nav} />
            <Switch>
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
            </Switch>
        </BrowserRouter>
    )
}

export default AppRoutes
