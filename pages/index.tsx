import LoginForm from '@/components/LoginForm/LoginForm';
import { useEffect, useState } from 'react';

import Home from './api/home';
import {users} from '../users'
export { getServerSideProps } from './api/home';


export default function Index(props: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [propsExtended, setPropsExtended] = useState(props)

    useEffect(()=>{
        setPropsExtended({...props, handleLogout})
        const user = localStorage.getItem('ai-user');
        if(user){
            const {username, password} = JSON.parse(user)
            const index = users.findIndex( u => u.user===username)
            if(index!= -1 && users[index].password === password){
                setIsLoggedIn(true)
            } 
        } 
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('ai-user');
        setIsLoggedIn(false)
    }

    const handleLogin = (username: string, password: string) => {
        setIsLoggedIn(true)
        localStorage.setItem('ai-user', JSON.stringify({username, password}))
    }

    if (!isLoggedIn) {
        return <LoginForm onSubmit={handleLogin}/>
    }

    return <Home { ...propsExtended}/>
}