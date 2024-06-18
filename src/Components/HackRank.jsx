import React from 'react'
import Navigationbar from './Navigationbar'
import JobCard from './JobCard'

export default function HackRank({isAuth,setIsAuth}) {
  return (
    <div>
        <Navigationbar isAuth={isAuth} setIsAuth={setIsAuth}></Navigationbar>
        <h1 className='jobTyeTitle'>HackRank</h1>
        <JobCard isAuth={isAuth} setIsAuth={setIsAuth} JobType={"HackRank"}></JobCard>
    </div>
  )
}
