import React,{useState,useContext, useEffect} from 'react'
import { InputBase } from '@mui/material'
import { 
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Separator,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
import axios from 'axios';
import { Loader2 } from 'lucide-react';


function SectionForm({setDisabled,sectionId}) {
  const [value, setValue] = useState('');
  const [loading,setLoading] =useState(false);
  const name = `section_${sectionId}`;
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

  function onChange(e) {
    setDisabled(true);
    setValue(e.target.value);
    setResumeInfo({
      ...resumeInfo,
      Sections:{
        ...resumeInfo.Sections,
        [name] : {
          ...resumeInfo.Sections[name],
          content : e.target.value
        }
      }
    });
    console.log(resumeInfo);
  }

  const titleChangehandle = (event)=>{
    setDisabled(true);
    const {name1,value} =event.target;
    setResumeInfo({
      ...resumeInfo,
      Sections : {
        ...resumeInfo.Sections,
        [name] : {
          ...resumeInfo.Sections[name],
          title : value
        }
      }
    })
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

  const onRemove = ()=>{
    setResumeInfo(
      {
        ...resumeInfo,
        Sections : {
          ...resumeInfo.Sections,
          [name]:{
            ...resumeInfo.Sections[name],
            enable : false
          }
        }
      }
    )
  }


  return (
    <form onSubmit={onSave}>
      <div className='grid grid-cols-2'>
        <div className='col-span-2 mr-2'>
            <label className='text-sm'>Title</label>
            <InputBase name='secondMark' required   placeholder={resumeInfo.Sections[name].title} onChange={titleChangehandle}
            className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'/>
          </div>
          <div className='col-span-2 mt-5'>
            <EditorProvider>
              <Editor value={value} onChange={onChange}>        
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <Separator />
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <Separator />
                  <BtnNumberedList />
                  <BtnBulletList />
                  <Separator />
                  <BtnLink />
                  <Separator />
                  <BtnStyles />
                </Toolbar>
              </Editor>
            </EditorProvider>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
          </div>
          
          <div className="col-span-2 flex justify-between">
          <button disabled={loading} className='bg-[#440CCC] text-white border-[#440CCC] mt-5 rounded-md py-2 px-5 hover:py-3 hover:px-6 hover:shadow-md transition-all cursor-pointer' onClick={onRemove}>
                  {
                    loading ? <Loader2  className='animate-spin'/> : 'Remove Section'
                  }
              </button>
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

export default SectionForm