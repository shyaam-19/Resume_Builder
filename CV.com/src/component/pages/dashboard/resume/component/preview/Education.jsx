import React from 'react'

function Education({resumeInfo}) {
  return (
    <div className='mt-5'>
        <div className='title text-lg font-bold'>
            Education Details:
        </div>
        <div className='mt-1 text-md font-medium'>
            &emsp;Collage name : {resumeInfo?.education.collageName}
        </div>
        <div className='mt-[2px] text-sm'>
            &emsp;Branch : {resumeInfo?.education.branch}
        </div>
        <div className='mt-[2px] text-sm'>
            &emsp;SPI : {resumeInfo?.education.collageSpi}
        </div>

        <div className='mt-1 text-md font-medium'>
            &emsp;{resumeInfo?.education.higherEdu==='HSC' ? 'School Name' : 'Collage Name' } : {resumeInfo?.education.higherEduSchool}
        </div>
        <div className='mt-[2px] text-sm'>
            &emsp;{resumeInfo?.education.higherEdu==='HSC' ? 'percentage' : 'SPI' } : {resumeInfo?.education.higerEduMark}
        </div>

        <div className='mt-1 text-md font-medium'>
            &emsp;Secondery School Name : {resumeInfo?.education.secondSchool}
        </div>
        <div className='mt-[2px] text-sm'>
            &emsp;percentage : {resumeInfo?.education.secondMark}
        </div>
        

    </div>
  )
}

export default Education