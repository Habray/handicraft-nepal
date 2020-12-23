import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import{useSelector} from 'react-redux';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}))

    // we check of user and alos of user token coz sometime 0 value is also consider as token
    // this is for when user try to go to forget/password when they are already loged in we redirect them to home screen
    useEffect(() => {
        if(user && user.token) history.push('/')
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        // configure for the landing page where we will be redirected after password is reset by user.
        const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true
    }

    await auth.sendPasswordResetEmail(email, config)
    .then(()=>{
        setEmail('')
        setLoading(false)
        toast.success('Check Your Email For Password Reset Link')
    })
    .catch((error) => {
        setLoading(false)
        toast.error(error.message)
        console.log('ERROR MSG IN FORGOT PASSWORD', error)
    })
    }

    return <div className='container col-md-6 offset-md-3 p-5'>
        {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Forget Password</h4>}

        <form onSubmit={handleSubmit}>
            <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder = 'Enter your email'
            autoFocus
            />
            <br/>
            <button className='btn btn-raised' disabled={!email}>Submit</button>
        </form>
    </div>
}

export default ForgotPassword;