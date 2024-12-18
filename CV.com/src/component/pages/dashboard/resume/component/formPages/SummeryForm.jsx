import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
// import {Input} from '@/component/ui/input'
// import { Input } from 'postcss'
import { InputBase } from '@mui/material';
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Loader2 } from 'lucide-react';

function SummeryForm({setDisabled}) {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [loading,setLoading] = useState(false)

  const handleOnChange = (event)=>{
    setDisabled(true);
    const {name,value} = event.target;
    setResumeInfo({
      ...resumeInfo,
      [name]:value
    });
  }

  const onSave = async(event)=>{
    event.preventDefault(); 
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/updateresumedetails`,resumeInfo);
      setLoading(false);
      setDisabled(false);
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSave}>
      <div className='grid grid-cols-2 shadow-lg bg-slate-50 border-[#440CCC] mr-5 md:mr-10 p-7 border-t-[20px]'>
      <div className='col-span-2'>
          <label className='text-sm'>Summery</label>
          <InputBase name='summery' placeholder='Summery' onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'    
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button type='submit' disabled={loading} className='bg-[#440CCC] text-white border-[#440CCC] mt-5 rounded-md py-2 px-5 hover:py-3 hover:px-6 hover:shadow-md transition-all cursor-pointer'>
              {
                loading ? <Loader2  className='animate-spin'/> : 'save'
              }
          </button>
        </div>
      </div>
    </form>

  )
}

export default SummeryForm