import React, {useState,useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import{useSelector} from 'react-redux';

const Register = ({history}) => {
    
    // to control the "input" field
    const [email, setEmail] = useState('')

    const {user} = useSelector((state) => ({...state}))

    // this is for when user try to go to Register page when they are already loged in we redirect them to home screen
    useEffect(() => {
        if(user && user.token) history.push('/')
    }, [user, history])

    const handleSubmit = async (e) => {
    // this function is create for generating the link when new user register and verify the email address for the website
    
    e.preventDefault() // To prevent the page from reloading after user click on register
    
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL)
    
    // configure for the landing page where we will be sending link and to create a password by user.
    const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true
    }

    await auth.sendSignInLinkToEmail(email, config)
    // here then key below 'Esc' i.e. "`" is pressed to enter message
    toast.success(`Email is send to ${email}. Click the link to complete your registration.`)
    // Save user email in local storage so that we don't want user to enter email again
    // setItem is use for saving and getItem is use for extract/load from local stroage.
    window.localStorage.setItem('emailForRegistration', email)
    // to clear the state after email is typed
    setEmail('')
}

    // No need of curly braces when there is only one element inside function
    const registerForm = () =>
        // onSubmit, onChange are event handlers
        <form onSubmit={handleSubmit}>
            <input 
            type='email' 
            className='form-control' 
            value={email} 
            // For checking on console
            // onChange={e => console.log(e.target.value)}
            onChange={e => setEmail(e.target.value)}
            // When user lands on register page for the first time "input" field will be active by default
            autoFocus
            // for the hint inside field
            placeholder="Enter your email"
            />
            <br/>
            <button type='submit' className='btn btn-raised'>Register</button>
        </form>

    return (
        <div className='container p-5'>
            {/* Row has to be all together of 12 column */}
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;