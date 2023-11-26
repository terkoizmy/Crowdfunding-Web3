import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { logo, sun }  from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick}) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive === name && 'bg-[#2c2f32]'} 
  flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt='fund_logo' className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt='fund_logo' className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}

  </div>
)

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  
  useEffect(() => {
    if(location.pathname !== isActive){
      setIsActive(`${location.pathname.substring(1)}`)
    }
  }, [location.pathname])

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to='/dashboard'>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} /> 
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] 
      rounded-[20px] w-[76px] py-4 mt-12">
        <div className='flex flex-col justify-center items-center gap-y-3.5'>
          {navlinks.map((Link) => (
            <Icon key={Link.name} {...Link} isActive={isActive} 
            handleClick={() => {
              setIsActive(Link.name);
              navigate(Link.link)
            }} />
          ))}

        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />

      </div>
      
    </div>
  )
}

export default Sidebar