import React, {useState, useEffect} from 'react';
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import {Button} from 'antd';
import{useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {createOrUpdateUser} from '../../functions/auth';


const Login = ({history}) => {
    
    // to control the "input" field
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}))

    // this is for when user try to go to login page when they are already loged in we redirect them to home screen
    // EDITED: to make intended work as it will return intented page else continue as mention above
    useEffect(() => {
        let intended = history.location.state
        if (intended) {
            return // so that non of the below code will run
        } else {
            if(user && user.token) history.push('/')
        }
    }, [user, history])

    // Redirect page for admin and user login
    const roleBasedRedirect = (res) => {

        // check if intended as we declear state on RatinModal
        let intended = history.location.state
        if(intended) {
            // taking user to intended page
            history.push(intended.from)
        } else {
            if(res.data.role === 'admin') {
                history.push('admin/dashboard')
            } else {
                history.push('/user/history')
            }
        }
    }

    let dispatch = useDispatch()

    const handleSubmit = async (e) => {
    // this function is create for generating the link when new user register and verify the email address for the website
    
    e.preventDefault() // To prevent the page from reloading after user click on register

    setLoading(true)
    // to check our email and password is summitting to firebase
    // console.table(email,password)

    try{
        const result = await auth.signInWithEmailAndPassword(email, password)
        // console.log(result)
        const {user} = result
        const idTokenResult = await user.getIdTokenResult()

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
                
                // when user login it will redirect to home page and if admin login it will redirect to admin pannel
                // we do that by takeing role from res. 
                roleBasedRedirect(res)
            }
        )
        .catch(error => console.log(error))

        
        // history.push('/')

        
    } catch (error){
        console.log(error)
        toast.error(error.message)
        setLoading(false)
    }
    
}

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
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
                    roleBasedRedirect(res)
                })
                .catch(error => console.log(error))
                // history.push('/')
            })
        .catch((error) => {
            console.log(error)
            toast.error(error.message)
        })
    }

    // No need of curly braces when there is only one element inside function
    const loginForm = () =>
        // onSubmit, onChange are event handlers
        <form onSubmit={handleSubmit}>

            {/* For Email Input Field */}
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

            {/* For Password Input Field */}
            <input 
            type='password' 
            className='form-control' 
            value={password} 
            // For checking on console
            // onChange={e => console.log(e.target.value)}
            onChange={e => setPassword(e.target.value)}
            // for the hint inside field
            placeholder="Enter Password"
            />
            <br/>

            {/* For Email Login Button  */}
            <Button
            onClick={handleSubmit}
            type='primary'
            className='mb-3'
            block
            shape='round'
            icon={<MailOutlined/>}
            size='large'
            disabled = {!email || password.length<6}
            >Login with Email/Password</Button>

            {/* For Google Login Button  */}
            <Button
            onClick={googleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined/>}
            size='large'
            >Login with Google</Button>
        </form>

    return (
        <div className='container p-5'>
            {/* Row has to be all together of 12 column */}
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}
                    
                    <Link to='/forgot/password' className="float-right text-danger">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;