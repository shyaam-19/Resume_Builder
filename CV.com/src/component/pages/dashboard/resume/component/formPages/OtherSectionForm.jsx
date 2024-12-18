import React, { useState,useContext, useEffect } from 'react';
import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import SectionForm from './sections/SectionForm';

function OtherSectionForm({setDisabled,sectionId}) {
  
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [numberOfSection,setNumberOfSection] = useState(
     Object.keys(resumeInfo.Sections).length - 1
  )

  const addSectionToObject = ()=>{
    // setNumberOfSection(numberOfSection+1);
    const newSectionId = `section_${numberOfSection+1}`;
    console.log(newSectionId);
    const newSection = {
      [newSectionId]: {
        enable: true,
        title: 'Title',
        content: ''
      }
    };

    setResumeInfo({
      ...resumeInfo,
      Sections : {
        ...resumeInfo.Sections,
        ...newSection
      }
    });
    setNumberOfSection(numberOfSection+1);
  }

  return (
    <div className='grid grid-cols-2 shadow-lg bg-slate-50 border-[#440CCC] mr-5 md:mr-10 p-7 border-t-[20px] w-full'>
      {(sectionId>numberOfSection) ? 
          <div className='col-span-2 flex justify-between w-full'>
            <button className='flex bg-[#440CCC] text-white border-[#440CCC] mt-5 rounded-md py-2 px-5 hover:py-3 hover:px-6 hover:shadow-md transition-all cursor-pointer'
              onClick={addSectionToObject}
            >
                 Add Section<PlusIcon/>
            </button>
      
          </div> :
          <div className='col-span-2'>
            <SectionForm setDisabled={setDisabled} sectionId={sectionId}/>
          </div>
      }
    </div>
  )
}

export default OtherSectionForm