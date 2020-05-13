import React, { useState, useContext } from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
} from '@material-ui/core'
import './styles.scss'
import { Link, Redirect } from 'react-router-dom'
import { LoginFormValidations } from '../../utils/formValidations/loginFormValidations'
import { useForm } from '../../utils/customHooks'
import { UserContext } from '../Context'
import { ILogin } from '../../utils/interface'

const formValidations = LoginFormValidations()

const Login: React.FunctionComponent = () => {
    const [formStatus, setFormStatus] = useState('')
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const [redirectToDashboard, setRedirectToDashboard] = useState(false)

    // useForm for login form.
    const {
        values,
        touchedValues,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setValues,
        allowSubmit,
    } = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit({ values, e }: any) {
            if (allowSubmit) {
                submitSignUpForm()
            }
        },
        validate(values: ILogin) {
            const formErrors: any = {}
            let errorArray = []
            let allowFormSubmit = false
            Object.entries(values).forEach(([key, value]) => {
                if (formValidations.has(`validate${key}`)) {
                    let result = null
                    result = formValidations.get(`validate${key}`)(value)
                    formErrors[`${key}`] = result.flag
                    formErrors[`${key}Message`] = result.message
                    if (result.flag) {
                        errorArray.push(result.flag)
                    }
                }
            })
            if (errorArray.length === 0) {
                allowFormSubmit = true
            }
            return { formErrors, allowFormSubmit }
        },
    })

    const submitSignUpForm = () => {
        fetch('http://www.mocky.io/v2/5eb79e9f3100000d00c8a1ec', {
            method: 'post',
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status === 200) {
                    setFormStatus('Login successfully')
                    localStorage.setItem('token', 'valid token')
                    setCurrentUser({
                        email: 'demo@email.com',
                        fullName: 'John Doe',
                        isLoggedIn: true,
                    })
                    clearLoginForm()
                    setRedirectToDashboard(true)
                } else {
                    setFormStatus('Something went wrong. Please try again')
                }
            })
            .catch((error) => {
                console.error(error)
                setFormStatus('Something went wrong. Please try again')
            })
    }

    const clearLoginForm = () => {
        setValues({
            email: '',
            password: '',
        })
    }

    if (redirectToDashboard && currentUser.isLoggedIn) {
        return <Redirect to="/dashboard/" />
    }

    return (
        <div className="authWrapper">
            <h2>Login</h2>
            <Card elevation={3}>
                <form>
                    <CardContent>
                        <TextField
                            variant="outlined"
                            id="email"
                            name="email"
                            label="Enter your email to get started"
                            placeholder="email address"
                            value={values.email}
                            error={touchedValues.email && errors.email}
                            helperText={errors.emailMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            id="password"
                            name="password"
                            type="password"
                            label="Enter your password"
                            placeholder="password"
                            value={values.password}
                            error={touchedValues.password && errors.password}
                            helperText={errors.passwordMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Link to="/sign-up/">Don't have account? Sign up.</Link>
                    </CardContent>
                    {formStatus && <h4 className="formStatus">{formStatus}</h4>}
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={allowSubmit ? false : true}
                            onClick={handleSubmit}
                        >
                            Continue
                        </Button>
                        <Link to="/forget-password/">Forget password?</Link>
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

export default Login
