import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreview from '../../component/ResumePreview';
import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo';
import data from'@/component/pages/dashboard/resume/component/dummy'
// import data from '@/component/pages/dashboard/resume/[resumeId]/edit/data';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
function EditResume() {

    const params = useParams();
    const [resumeInfo,setResumeInfo]=useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      console.log(params.resumeId);
      const getResumeData = async()=>{
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/auth/getresumedetails`,{
          params : {
            resumeID : params.resumeId
          }
        });
        setResumeInfo(res.data);
        setLoading(false);
      }

      getResumeData();
      
    },[])
   

  return (
    <div>
      {
        loading ?
        <div className='w-screen h-screen flex items-center'> 
        <Loader2 className='animate-spin m-auto'/> </div>:
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div className='grid w-screen grid-cols-1 md:grid-cols-2 p-10 gap-10'>
          {/* Form section.. */}
          <FormSection/>
          {/* Form section ends here..... */}

          {/* Previwe section.. */}
          <ResumePreview/>
          {/* Form Previwe ends here..... */}
        </div>
      </ResumeInfoContext.Provider>
      }
    </div>
  )
}

export default EditResume