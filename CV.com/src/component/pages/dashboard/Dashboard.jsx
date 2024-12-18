import React, { useEffect, useState } from 'react'
import '../../styledComponent/dashboard.css'
import AddResume from '../../uiComponent/AddResume.jsx'
import ResumeNameCard from '@/component/uiComponent/ResumeNameCard'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const [resumeList,setResumeList] = useState([]);
  const [cookies, setCookie,removeCookie] = useCookies(['user']);
  const [loading,setLoading] =useState(true);
  const [dataLoaded,setDataLoaded] = useState(false);
  const email = cookies.email;
  const navigate = useNavigate();
  

  useEffect(()=>{

    const fetchData = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/auth/addresumeid`,{
          params : {email:email}
        })

        setResumeList(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  },[]);

  useEffect(() => {
    console.log('hii');
    if(resumeList.length!==0){
      setDataLoaded(true);
    }
  }, [resumeList]);


  if(loading){
    return(
      <div className='w-screen h-screen flex justify-center items-center'>
        <Loader2 className='animate-spin text-4xl'/>
      </div>
    )
  }

  return (
    <div>
      <div className='px-10 pt-10 pb-5 md:px-20 text-4xl font-semibold' >
        My Resume
      </div>
      
      <div className="px-10 pb-15 md:px-20 text-xl ">
        Start and explore resume,create resume with AI.
      </div>
      <div className='p-10 md:px-20 flex justify-center md:justify-start flex-wrap'>
        <AddResume/>
        {/* <ResumeNameCard name='Hasrh_resume'/> */}
        {dataLoaded && resumeList && resumeList.map((key,index)=>{
          // console.log(resumeList);
          return <ResumeNameCard name={key} key={index} resumeList={resumeList} setResumeList={setResumeList}/>
        })}
      </div>
    </div>
  )
}

export default Dashboard