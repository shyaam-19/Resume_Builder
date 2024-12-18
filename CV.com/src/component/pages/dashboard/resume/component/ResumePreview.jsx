import { ResumeInfoContext } from '@/component/pages/context/ResumeContextInfo'
import React, { useContext,useRef } from 'react'
import PersonalDetails from './preview/PersonalDetails'
import { BorderColor } from '@mui/icons-material'
import Education from '../component/preview/Education.jsx';
import SummeryPreview from './preview/SummeryPreview'
import OtherSections from './preview/OtherSections';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const divRef = useRef(null);

    const handleDownload = async () => {
      const element = divRef.current;
      if (element) {
        // High resolution for better quality
        const scale = 2;
  
        const canvas = await html2canvas(element, {
          scale: scale,
          useCORS: true, // Enable cross-origin images
          allowTaint: true,
          backgroundColor: null, // Ensure no background color
        });
  
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
  
        // Calculate dimensions to maintain aspect ratio
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        // Add image to PDF with higher quality
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        pdf.save('Resume.pdf');
      }
    };
  


  return (
    <div className='pb-8'>
      <div ref={divRef} className='shadow-lg h-full w-full mr-5 md:mr-10 p-14 border-t-[20px] ' 
      style={{
          borderColor : resumeInfo?.themeColor
      }}>
          {/* Personal Data */}
              <PersonalDetails resumeInfo={resumeInfo}/>
          {/* Personal Detail ends here .....*/}

          {/* Summery Data */}
            <SummeryPreview resumeInfo={resumeInfo}/>
          {/* Summery Detail ends here .....*/}

          {/* Education Data */}
          <Education resumeInfo={resumeInfo}/>
          {/* Education Detail ends here .....*/}

          {/* Profession Experience Data */}
          <OtherSections resumeInfo={resumeInfo}/>
          {/* Profession Experience Detail ends here .....*/}
      </div>
      <div className='flex justify-end mr-2'>
        <button onClick={handleDownload} className='bg-[#440CCC] text-white border-[#440CCC] mt-5 rounded-md py-2 px-5 hover:py-3 hover:px-6 hover:shadow-md transition-all cursor-pointer'>
                  Download
          </button>
      </div>
      
    </div>
  )
}

export default ResumePreview