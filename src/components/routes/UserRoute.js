import React from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';


// to secure the user route from accessing without login in the website
const UserRoute = ({children, ...rest}) => {
    
    const {user} = useSelector((state) => ({...state}))

    // check for user 
    return user && user.token ? (

        // if we have user in state we return route with rest of the props and children content
        <Route {...rest}/> 
    ) : (

        // other wise we show countdown from LoadingToRedirect
        <LoadingToRedirect/>
    )
}

export default UserRoute;