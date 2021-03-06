import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
} from '@material-ui/core'
import './styles.scss'
import { Link } from 'react-router-dom'
import { SignUpFormValidations } from '../../utils/formValidations/signUpFormValidations'
import { useForm } from '../../utils/customHooks'
import { ISignUp } from '../../utils/interface'

const formValidations = SignUpFormValidations()

const SignUp: React.FunctionComponent = () => {
    const [formStatus, setFormStatus] = useState('')

    // useForm for account settings form.
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
            fullName: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit({ values, e }: any) {
            if (allowSubmit) {
                submitSignUpForm()
            }
        },
        validate(values: ISignUp) {
            const formErrors: any = {}
            let errorArray = []
            let allowFormSubmit = false
            Object.entries(values).forEach(([key, value]) => {
                if (formValidations.has(`validate${key}`)) {
                    let result = null
                    if (key === 'confirmPassword') {
                        result = formValidations.get(`validate${key}`)(
                            value,
                            values.password
                        )
                    } else {
                        result = formValidations.get(`validate${key}`)(value)
                    }
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
        fetch('https://www.mocky.io/v2/5eb79e9f3100000d00c8a1ec', {
            method: 'post',
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status === 200) {
                    setFormStatus('Sign up successfully')
                    clearSignUpForm()
                } else {
                    setFormStatus('Something went wrong. Please try again')
                }
            })
            .catch((error) => {
                console.error(error)
                setFormStatus('Something went wrong. Please try again')
            })
    }

    const clearSignUpForm = () => {
        setValues({
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        })
    }

    return (
        <div className="authWrapper">
            <h2>Sign up</h2>
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
                            id="fullName"
                            name="fullName"
                            label="Enter your full name"
                            placeholder="John Doe"
                            value={values.fullName}
                            error={touchedValues.fullName && errors.fullName}
                            helperText={errors.fullNameMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            id="password"
                            name="password"
                            type="password"
                            label="Choose your password"
                            placeholder="password"
                            value={values.password}
                            error={touchedValues.password && errors.password}
                            helperText={errors.passwordMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm your password"
                            placeholder="password"
                            value={values.confirmPassword}
                            error={
                                touchedValues.confirmPassword &&
                                errors.confirmPassword
                            }
                            helperText={errors.confirmPasswordMessage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Link to="/login/">Already have account? Log in.</Link>
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
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

export default SignUp
