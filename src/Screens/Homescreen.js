import React, { useState, useEffect } from 'react'
import Authscreen from './Authscreen'
import Userscreen from './Userscreen'

const Homescreen = () => {
    // variable that holds the current user
    const [user, setUser] = useState()
    
    // checking if user exists in localstorage and user variable is empty
    useEffect(() => {
        if(localStorage.getItem('user') && !user)
        {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [user])

    return (
        // show login page if user is not logged in
        user ? <Userscreen user={user} setUser={setUser} /> : <Authscreen setUser={setUser} />
    )
}

export default Homescreen
