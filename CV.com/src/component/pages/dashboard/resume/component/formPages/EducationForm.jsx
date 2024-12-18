import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
// import {Input} from '@/component/ui/input'
// import { Input } from 'postcss'
import React, { useContext, useState } from 'react'
import { InputBase } from '@mui/material';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

function EducationForm({setDisabled}) {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [loading,setLoading] = useState(false)

  const handleOnChange = (event)=>{
    setDisabled(true);
    const {name,value} = event.target;
    setResumeInfo({
      ...resumeInfo,
      education: {
        ...resumeInfo.education,
        [name]: value
      }
    });
    console.log(resumeInfo);
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
          <label className='text-sm'>Collage Name</label>
          <InputBase name='collageName' placeholder='Collage Name' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'    
          />
        </div>
        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>Branch</label>
          <InputBase name='branch' placeholder='Branch' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label className='text-sm'>SPI</label>
          <InputBase name='collageSpi' placeholder='SPI' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>


        <div className="col-span-2 pt-5 mr-2">
          <label htmlFor="higherEdu">Choose a One:</label>
          <select name='higherEdu' value={resumeInfo?.education.higherEdu} onChange={handleOnChange} className='mx-3 px-3 py-1 mb-2 border-black border-[2px] rounded-md focus-within:border-[#440CCC]'>
            <option value='HSC' >HSC</option>
            <option value="diploma">Diploma</option>
          </select>
        </div>

        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>{resumeInfo?.education.higherEdu==='HSC' ? 'School Name' : 'Collage Name' }</label>
          <InputBase name='higherEduSchool' placeholder={resumeInfo?.education.higherEdu} onChange={handleOnChange} className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>
        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>{resumeInfo?.education.higherEdu==='HSC' ? 'percentage' : 'SPI' } </label>
          <InputBase name='higerEduMark' placeholder='percentage' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>

        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>Secondery School Name</label>
          <InputBase name='secondSchool' placeholder='Secondery School Name' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'    
          />
        </div>
        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>percentage</label>
          <InputBase name='secondMark' placeholder='percentage' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
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

export default EducationForm