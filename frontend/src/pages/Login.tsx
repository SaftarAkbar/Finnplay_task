import { useState } from 'react'

import Button from '../ui/components/Button'
import Input from '../ui/components/Input'

import finnplay_logo from '../assets/img/finnplay_logo.svg'
import { useNavigate } from 'react-router-dom'

import '../assets/css/login.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const onSubmitForm = () =>{
        alert(`username: ${username}, password: ${password}`)
        navigate("/")
    }

    return <div className='login'>
        <img src={finnplay_logo} alt="" />
        <div className='login_container'>
            <div className='form-element'>
                <Input handleChange={(e)=>setUsername(e.target.value)} name="username" value={username} type="text" label="Login" />
            </div>
            <div className='form-element'>
                <Input handleChange={(e)=>setPassword(e.target.value)} name="password" value={password} type="password" label="Password" />
            </div>
            <div className='form-element'>
                <Button btnStyle={{ background: "#FDBC11", width: "100%" }} onClick={onSubmitForm} title='Login' />
            </div>
        </div>
    </div>
}

export default Login;