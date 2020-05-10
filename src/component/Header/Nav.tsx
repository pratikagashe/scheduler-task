import React from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Nav: React.FunctionComponent = () => {
    return (
        <AppBar position="fixed" color="inherit" className="navBar">
            <Toolbar>
                <h4>Scheduler Task</h4>
                <Link to="/sign-up/">
                    <Button color="inherit">Sign Up</Button>
                </Link>
                <Link to="/login/">
                    <Button color="inherit">Login</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
