import {InputBase}  from '@mui/material'
import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
// import {Input} from '@/component/ui/input'
// import { Input } from 'postcss'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Loader2 } from 'lucide-react';

function PersonalDetailsForm({setDisabled}) {

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
        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>First Name</label>
          <InputBase name='firstName' placeholder='First Name' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label className='text-sm'>Last Name</label>
          <InputBase name='lastName' placeholder='Last Name' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>
        <div className='col-span-2'>
          <label className='text-sm'>Job Title</label>
          <InputBase name='jobTitle' placeholder='Job Title' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'    
          />
        </div>
        <div className='col-span-2'>
          <label className='text-sm'>Address</label>
          <InputBase name='address' placeholder='Address' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'    
          />
        </div>
        <div className='col-span-2 md:col-span-1 mr-2'>
          <label className='text-sm'>mobile Number</label>
          <InputBase name='phone' placeholder='Mobile Number' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>
        <div className='col-span-2 md:col-span-1'>
          <label className='text-sm'>Email</label>
          <InputBase name='email' placeholder='Email' required onChange={handleOnChange}
          className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>
        <div className="col-span-2 md:col-span-1 pt-5 mr-2">
          <label htmlFor="firstLink">Choose a One:</label>
          <select name='firstLinkName' value={resumeInfo?.firstLinkName} onChange={handleOnChange} className='mx-3 px-3 py-1 mb-2 border-black border-[2px] rounded-md focus-within:border-[#440CCC]'>
            <option value='none' >None</option>
            <option value="Github">Github</option>
            <option value="Linkdin">Linkdin</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value='Twitter'>Twitter(X)</option>
          </select>
          <InputBase name='firstLink' placeholder={resumeInfo?.firstLinkName} onChange={handleOnChange} className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
        </div>

        <div className="col-span-2 md:col-span-1 pt-5">
          <label htmlFor="secondLink">Choose a One:</label>
          <select name='secondLinkName'  value={resumeInfo?.secondLinkName} onChange={handleOnChange} className='mx-3 px-3 py-1 mb-2 border-[2px] border-black rounded-md focus-within:border-[#440CCC]'>
            <option value='none' >None</option>
            <option value="Github">Github</option>
            <option value="Linkdin">Linkdin</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value='Twitter'>Twitter(X)</option>
          </select>
          <InputBase name='secondLink' placeholder={resumeInfo?.secondLinkName} onChange={handleOnChange} className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
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

export default PersonalDetailsForm