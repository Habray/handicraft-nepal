import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../functions/auth';


// to secure the user route from accessing without login in the website
const AdminRoute = ({children, ...rest}) => {
    
    const {user} = useSelector((state) => ({...state}))

    const [ok,setOk] = useState(false)

    useEffect(() => {

        // to make sure we have the login user first
        if(user && user.token) {
            currentAdmin(user.token)
            .then(res => {
                console.log('CURRENT ADMIN RES',res)
                setOk(true)
            })
            .catch(err => {
                console.log('ADMIN ROUTE ERR',err)
                setOk(false)
            })
        }
    }, [user])

    // check for user 
    return ok ? (

        // if we have user in state we return route with rest of the props and children content
        <Route {...rest}/> 
    ) : (

        // other wise we show countdown from LoadingToRedirect
        <LoadingToRedirect/>
    )
}

export default AdminRoute;