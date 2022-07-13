import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotifyButton from '../components/NotifyButton';
import Confetti from 'react-confetti'

function DevicesScreen() {

  const [devices, setDevices] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [celeb, setCeleb] = useState(false)

  const navigate = useNavigate();

  const currentDevices = devices?.length;

  // click to logout also remove localhost storage Items. 
  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

    // Custom Hook for window height and width. 
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

    // After 5 seconds fech data from /devices API.
  useEffect(() => {
    const interval = setInterval(() => {
      const fetchDevices = async () => {
        setLoading(true)
        const {data} = await axios.get('http://35.201.2.209:8000/devices')
        setLoading(false)
        setDevices(data.devices)
      }
      fetchDevices()

    }, 5000);
    return () => clearInterval(interval);
  }, [celeb]);


  // check is celebration is true or false. If true then show comfetti
  const isCelebrate = celeb ? <Confetti width={width} height={height} numberOfPieces={1000} /> : ""

  // remove celebration after 10 seconds. 
  useEffect(() => {
    const timer = setTimeout(() => {
      setCeleb(false)
    }, 10000)
    return () => clearTimeout(timer);
  }, [celeb])
  

  return (
    <>
      <div className='device-screen-wrapper'>

        {/* celebreate */}
        <div className='celebration'>
          {
            isCelebrate
          }
        </div>

        {/* loading and error */}
        <div className='alert-box'>
          {/* { loading && <h2>Loading...</h2> } */}
          { error && <h2>{error}</h2> }
          
        </div>

        {/* middle box wrap */}
        <div className='device-middle-box-wrap'>
            
            <div className='count-logged-user'>
              <h1>{currentDevices ? currentDevices : <div className="loading device-loading"></div>}</h1>
              <h2>devices <br /> Online</h2>
              
              
            </div>
            
             <div className='circle-wrapper'>

              {
                  Array(currentDevices).fill(1).map((item, index) => {
                    return (
                      currentDevices ?
                      // item
                      <div className='circle' key={index}>

                        {/* glowing effect */}
                        <span className="glowing-effect-wrap">
                          <span className="ripple pinkBg"></span>
                          <span className="ripple pinkBg"></span>
                          <span className="ripple pinkBg"></span>
                          </span>
                      </div> : ""
                    )
                  })
                }
             </div>
        </div>

        {/* footer bottom fixed buttons */}
        <div className='device-footer-buttons'>

          {/* notify button */}
          <NotifyButton celeb={celeb} setCeleb={setCeleb} />

          {/* logout button */}
          <button onClick={logoutHandler} className='btn logout-btn' type='button'>Log out</button>
        </div>
      </div>
    </>
  )
}

export default DevicesScreen