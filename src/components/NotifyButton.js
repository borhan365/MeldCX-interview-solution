import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotifyButton({setCeleb}) {
  
  const [notify, setNotify] = useState({
    name: "Md Borhan Uddin",
    email: "info.mdborhan@gmail.com",
    repoUrl: "https://github.com/borhan365/MeldCX-interview-solution",
    message: "I just want to say you, Please give me a chance to prove myself. Thank you."
  })
  

  let token = localStorage.getItem("userInfo");

  // here is headers informations
  const config = {
    headers: {
      'Content-Type':'application/json',
      "Authorization" : `Bearer ${token}`
    },
  }

  // submit notify
  const submitNotify = async () => {
    await axios.post('http://35.201.2.209:8000/notify', notify, config)
    setCeleb(true)
    toast("Great! Notification send successfully!");
  }

  return (
    <div>
      <button onClick={submitNotify} className='btn notify-btn' type='button'>Notify</button>
      <ToastContainer />
    </div>
  )
}

export default NotifyButton