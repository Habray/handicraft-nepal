import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const LoadingToRedirect = () => {
    
    // Creating a countdown time with set interval so that when user is not loged in and try to access user history
    // instead of redirecting them directly we will have some countdown time before redirecting
    const [count, setCount] = useState(5)
    let history = useHistory()

    // whenever the count change useEffect runs and decrement count from state until it reaches zero
    useEffect(() => {
        
        const interval = setInterval(() => {
            
            // decrement count
            setCount((currentCount) => --currentCount)
            
            // countdown every 1 second
        }, 1000)

        // redirect once count is equal to 0
        count === 0 && history.push('/')
        
        // cleanup interval
        return () => clearInterval(interval)
    }, [count, history])

    return (
        <div className='container p-5 text-center'>
            <p>Redirecting you in {count} seconds.</p>
        </div>
    )
}

export default LoadingToRedirect