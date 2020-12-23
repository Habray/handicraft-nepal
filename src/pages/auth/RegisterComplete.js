import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import{useDispatch} from 'react-redux';
import {createOrUpdateUser} from '../../functions/auth';


// as we need history object from react-router-dom as we need as push method to redirect user to another landing page
const RegisterComplete = ({history}) => {
    
    // to control the "input" field
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // define dispatch
    let dispatch = useDispatch()

    // here 1st argument is function and 2nd is dependency array with will call the function.
    useEffect(() => {
        // console.log(window.localStorage.getItem('emailForRegistration'))

        // to make user email available in setEmail so that user don't have to type
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

    // this function is create for generating the link when new user register and verify the email address for the website
    const handleSubmit = async (e) => {
    
    e.preventDefault() // To prevent the page from reloading after user click on register

    // validation for password
    if(!email || !password){
        toast.error('Email and Password is required.')
        return // as this validation fail user cannot go through the process here below
    }
    if(password.length <6){
        toast.error('Password must be atleast 6 character long')
        return // as this validation fail user cannot go through the process here below
    }


    try{// window.location.href grabs the whole url
        const result = await auth.signInWithEmailLink(email, window.location.href)
        // console.log("RESULT", result)

        // if the user email is verified with the generated link
        if(result.user.emailVerified){
            // remove user email from local storage
            window.localStorage.removeItem('emailForRegistration')
            
            // password here is enterd password by user and is available in useState, 
            // so that next time user will login with email and password
            let user = auth.currentUser
            await user.updatePassword(password)

            // get user id token
            const idTokenResult = await user.getIdTokenResult()
            // checking user and idTokenResult
            // console.log('user', user, 'idTokenResult', idTokenResult)

            // redux store beacuse we need to access the user emails, id, tokens in different places
            // so we put it in global state i.e. redux state and it can be access whenever we need

            createOrUpdateUser(idTokenResult.token)
                .then(
                    res => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name, // data from backend
                                email: res.data.email, // data from backend
                                token: idTokenResult.token, // to acces only the token
                                role: res.data.role,
                                _id: res.data._id,
                            }
                        })
                    }
                )
                .catch(error => console.log(error))

            // redirect user to homepage 
            history.push('/')
        }
    } catch (error){
        console.log(error)
        toast.error(error.message)
    }
    
    
}

    // No need of curly braces when there is only one element inside function
    const completeRegistrationForm = () =>
        // onSubmit, onChange are event handlers
        <form onSubmit={handleSubmit}>

            {/* Input Field for Email */}
            <input 
            type='email' 
            className='form-control' 
            value={email} 
            // to make field unchangeable
            disabled
            />
            <br/>

            {/* Input Field for Password */}
            <input 
            type='password' 
            className='form-control' 
            value={password} 
            // For checking on console
            // onChange={e => console.log(e.target.value)}
            onChange={e => setPassword(e.target.value)}
            // to make Field Active
            autoFocus
            // for the hint inside field
            placeholder="Enter your Password"
            />
            <br/>
            <button type='submit' className='btn btn-raised'>Complete Registration</button>
        </form>

    return (
        <div className='container p-5'>
            {/* Row has to be all together of 12 column */}
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;