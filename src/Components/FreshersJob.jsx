import React from 'react'
import Navigationbar from './Navigationbar'
import JobCard from './JobCard'

export default function FreshersJob({isAuth,setIsAuth}) {
  return (
    <div>
    <Navigationbar isAuth={isAuth} setIsAuth={setIsAuth}></Navigationbar>
      <h1 className='jobTyeTitle'>Freshers Job</h1>
      
     <JobCard isAuth={isAuth} setIsAuth={setIsAuth} JobType={"FresherJob"}></JobCard>  
    </div>
  )
}
