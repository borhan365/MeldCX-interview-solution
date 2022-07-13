import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function NotifyButton({celeb, setCeleb}) {

  const [success, setSuccess] = useState(false)
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
    setSuccess(false)
    await axios.post('http://35.201.2.209:8000/notify', notify, config)
    setSuccess(true)
    setCeleb(true)
    toast("Great! Notification send successfully!");
  }

  // Hook
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  const innerHeightAndWidth = new useWindowSize()
  const {width, height} = innerHeightAndWidth;

  return (
    <div>
      <button onClick={submitNotify} className='btn notify-btn' type='button'>Notify</button>
        <ToastContainer></ToastContainer>
        <div className='celebration'>
        {/* { success && celeb ? <Confetti width={width} height={height} numberOfPieces={500} /> : "" } */}
        </div>
    </div>
  )
}

export default NotifyButton