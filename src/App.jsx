import React from 'react'
import { Route, Routes} from 'react-router-dom'

import { Sidebar, Navbar } from './components'

import { Home, Profile, CampaignDetails, CreateCampaign } from './pages'

const App = () => {
  return (
    <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
      
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr5'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/dashboard" element={<Home />}  />
          <Route path="/profile" element={<Profile />}  />
          <Route path="/create-campaign" element={<CreateCampaign />}  />
          <Route path="/campaign-details/:id" element={<CampaignDetails />}  />
        </Routes>
      </div>
    </div>
  )
}

export default App