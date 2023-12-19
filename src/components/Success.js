import React from 'react'
import successvideo from '../assets/Success.mp4'
import { useNavigate } from 'react-router-dom'

const Success = () => {

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/', {replace: true});
      };
    return (
        <div className='videocontainer'>
            <video
                autoPlay
                loop
                muted
                width="500px"
                height="500px"
            >
                <source src={successvideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <button onClick={navigateHome}>Homepage</button>
        </div>
    )
}

export default Success