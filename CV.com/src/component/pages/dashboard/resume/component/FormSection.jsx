import { ArrowRightAltRounded} from '@mui/icons-material';
import { ArrowLeftIcon, LayoutPanelTop } from 'lucide-react'
import React, { useState,useContext, useEffect } from 'react'
import PersonalDetailsForm from './formPages/PersonalDetailsForm';
import SummeryForm from './formPages/SummeryForm';
import EducationForm from './formPages/EducationForm';
import OtherSectionForm from './formPages/OtherSectionForm';
import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'

function FormSection() {
    const [id,setId] = useState(1);
    const [sectionId,setSectioId]= useState(0);
    const [disabled,setDisabled] = useState(true);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const sections = resumeInfo.Sections;
    const key_sections = Object.keys(sections);


  return (
    <div>
        <div className='flex justify-between mr-10 mb-5'>
            <div className='text-black flex border-black border-2 rounded-md py-2 px-3 hover:py-3 hover:px-4 hover:shadow-md transition-all cursor-pointer'>
                <LayoutPanelTop color='black'/>Themes
            </div>
            <div className='flex'>
                {
                    id!==1 ?
                        <button className='bg-[#440CCC] text-white border-[#440CCC] rounded-md py-2 px-3 mr-1 hover:py-3 hover:px-4 hover:shadow-md transition-all cursor-pointer'
                            onClick={()=>{
                                if(sectionId!==1){
                                    setSectioId(sectionId-1);
                                }else{
                                    setId(id-1);
                                }
                            }}
                        >
                            <ArrowLeftIcon/>
                        </button> 
                        : 
                        <div></div>
                }
                <button disabled={disabled} className='bg-[#440CCC] text-white border-[#440CCC]  rounded-md py-2 px-3 hover:py-3 hover:px-4 hover:shadow-md transition-all cursor-pointer disabled:bg-blue-300'
                    onClick={()=>{
                        setDisabled(true);
                        if(id<3){
                            setId(id+1);
                        }else{
                            let add =1;
                            let flag = true
                            while(flag){
                                if(key_sections.length===sectionId+add){break;}
                                const enable = resumeInfo.Sections[key_sections[sectionId+add]].enable
                                if(enable){
                                    flag=false;
                                }else{
                                    add++;
                                }
                            }
                            
                            setSectioId(sectionId+add);
                            setId(4);
                        }
                    }}    
                >
                    Next<ArrowRightAltRounded/>
                </button>
            </div>
        </div>
        {
            id===1 && <PersonalDetailsForm setDisabled={setDisabled}/>
        }

        {
            id===2  && <SummeryForm setDisabled={setDisabled}/>
        }

        {
            id===3 && <EducationForm setDisabled={setDisabled}/>
        }
        {
            id===4  && <OtherSectionForm setDisabled={setDisabled} sectionId={sectionId}/>
        }
        
        
    </div>
  )
}

export default FormSection