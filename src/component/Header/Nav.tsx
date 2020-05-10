import React, { useContext } from 'react'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context'

const Nav: React.FunctionComponent = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)

    const logout = () => {
        localStorage.clear()
        setCurrentUser({
            email: '',
            fullName: '',
            isLoggedIn: false,
        })
    }

    return (
        <AppBar position="fixed" color="inherit" className="navBar">
            <Toolbar>
                <div className="logo">
                    {currentUser.isLoggedIn ? (
                        <Link to="/dashboard/">
                            <h4>Scheduler Task</h4>
                        </Link>
                    ) : (
                        <Link to="/">
                            <h4>Scheduler Task</h4>
                        </Link>
                    )}
                </div>
                {currentUser.isLoggedIn ? (
                    <React.Fragment>
                        <span>{currentUser.fullName}</span>
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={() => logout()}
                        >
                            Log out
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/sign-up/">
                            <Button color="inherit" variant="outlined">
                                Sign Up
                            </Button>
                        </Link>
                        <Link to="/login/">
                            <Button color="inherit" variant="outlined">
                                Login
                            </Button>
                        </Link>
                    </React.Fragment>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Nav
