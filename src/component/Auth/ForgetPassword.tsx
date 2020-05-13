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
import { ForgetPasswordFormValidations } from '../../utils/formValidations/forgetPasswordFormValidations'
import { useForm } from '../../utils/customHooks'
import { IForgetPassword } from '../../utils/interface'
const formValidations = ForgetPasswordFormValidations()

const ForgetPassword: React.FunctionComponent = () => {
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
            password: '',
        },
        onSubmit({ values, e }: any) {
            if (allowSubmit) {
                submitForgetPasswordForm()
            }
        },
        validate(values: IForgetPassword) {
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

    const submitForgetPasswordForm = () => {
        fetch('http://www.mocky.io/v2/5eb79e9f3100000d00c8a1ec', {
            method: 'post',
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.status === 200) {
                    setFormStatus(
                        `Reset password link has been sent to your email. ${values.email}`
                    )
                    clearForgetPasswordForm()
                } else {
                    setFormStatus('Something went wrong. Please try again')
                }
            })
            .catch((error) => {
                console.error(error)
                setFormStatus('Something went wrong. Please try again')
            })
    }

    const clearForgetPasswordForm = () => {
        setValues({
            email: '',
            password: '',
        })
    }

    return (
        <div className="authWrapper">
            <h2>Forget Password</h2>
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
                        <Link to="/login/">Back to login</Link>
                    </CardContent>
                    {formStatus && <h4 className="formStatus">{formStatus}</h4>}
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={allowSubmit ? false : true}
                            onClick={handleSubmit}
                        >
                            Send Reset Link
                        </Button>{' '}
                        {/* As currently there is no link will be sent to an email. Added button here to reset password */}
                        {formStatus && (
                            <Link to="/reset-password/">
                                <Button variant="contained" color="primary">
                                    Reset Password
                                </Button>
                            </Link>
                        )}
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

export default ForgetPassword
