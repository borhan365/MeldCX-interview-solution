import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPatchExclamationFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function LoginScreen() {

  const [formValues, setFormValues] = useState();
  const [loading, setLoading] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const config = {
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Content-Type': 'application/json'
    },
  }

  // handle submit
  const onSubmit = async (formData) => {
    setLoading(true)
    setFormValues(formData)
    
    if(formData?.password !== "meld123") {
       setWrongPassword(true)
       return
    } else {
      setWrongPassword(false)
    }

    const {data} = await axios.post('http://35.201.2.209:8000/login', formData, config)
       setLoading(false)
  
    // storing data in localstorage
    localStorage.setItem('userInfo', data)
    if(data) return navigate('/devices')
  };

  return (
    <div className='login-screen-wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
        <div className='login-box'>

          <h1 className='login-title'>Login</h1>

          {/* email */}
          <div className='input-group'>
          <input name='email' placeholder='Email address' {...register('email', { required: "Email is required!" })} />
            <MdEmail />
          </div>

          {/* thow errors if email field is empty */}
          <p className='error'>{errors.email?.message}</p>
          

          {/* password */}
          <div className='input-group'>
            <input name='password' type="password" placeholder="Passwrod" {...register('password', { required: "Password is required!" })} />
            <BsFillPatchExclamationFill />
          </div>
          <p className='error'>{errors.password?.message}</p>
          <p className='error'>
            {
              wrongPassword && "Password didn't match"
            }
          </p>

          {/* submit button */}
          <div className='input-group'>
            <button id='loginForm' type='submit' className='login-button'> 
            {loading && !wrongPassword ? <div class="loading"></div> : "Login" }</button>
            
          </div>

        </div>
      </form>
    </div>
  )
}

export default LoginScreen