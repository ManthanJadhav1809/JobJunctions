import React, { useEffect } from 'react'
import Navigationbar from './Navigationbar'
import JobCard from './JobCard'

export default function InternshipPage({isAuth,setIsAuth}) {
 
    useEffect(()=>{
     setIsAuth(true)
    })
 return (
    <div>
      <Navigationbar isAuth={isAuth} setIsAuth={setIsAuth}></Navigationbar>
      <h1 className='jobTyeTitle'>Internship</h1>
      <JobCard isAuth={isAuth} setIsAuth={setIsAuth} JobType={"Internship"}></JobCard>
    </div>
  )
}
