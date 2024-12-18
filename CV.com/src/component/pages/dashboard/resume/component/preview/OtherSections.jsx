import React from 'react'
import SectionPreview from './SectionPreview';

function OtherSections({resumeInfo}) {
    const sections = resumeInfo.Sections;
    let key_sections = Object.keys(sections).slice(1);
    console.log(key_sections);
  return (
    <div className=''>
        <div className='col-span-2 mr-2'>
            {
                key_sections.map((key,index)=>{
                    return <SectionPreview object_key={key} resumeInfo={resumeInfo} key={index}/>
                })
            }
        </div>
    </div>
  )
}

export default OtherSections