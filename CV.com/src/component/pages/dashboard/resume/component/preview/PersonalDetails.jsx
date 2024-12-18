import { Link } from '@mui/material'
import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
import React,{useContext} from 'react'

function PersonalDetails() {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div>
        <h2 className='font-bold text-xl text-center' 
            style={{
                color:resumeInfo?.themeColor
            }}
        >{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
        <h2 className='text-center text-sm font-medium'>{resumeInfo?.address}</h2>
        <div className='flex justify-between'>
            <h2 className='text-center text-xs font-medium'>
                {resumeInfo?.phone}
            </h2>
            <h2 className='text-center text-xs font-medium'>
                {resumeInfo?.email}
            </h2>
        </div>
        <div className='flex justify-between'>
            {
                resumeInfo?.firstLinkName==='none' ? 
                    <></> :
                    <div className='text-xs font-medium mt-1 cursor-pointer' onClick={()=>{window.location.href=resumeInfo?.firstLink}}>
                        {resumeInfo?.firstLinkName}
                    </div> 
            }
            {
                resumeInfo?.secondLinkName==='none' ? <></> : 
                <div className='text-xs font-medium mt-1 cursor-pointer' onClick={()=>{location.replace(resumeInfo?.secondLink)}}>
                        {resumeInfo?.secondLinkName}
                    </div>
            }
        </div>

        <hr className='border-[1.5px] my-2'
         style={{
            borderColor : resumeInfo?.themeColor
         }}
         />
    </div>
  )
}

export default PersonalDetails