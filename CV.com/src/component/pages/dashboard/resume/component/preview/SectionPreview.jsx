import React from 'react'
import '../../../../../styledComponent/sectionpreview.css'
import parse from 'html-react-parser'


function SectionPreview({object_key,resumeInfo}) {
  const section =resumeInfo.Sections[object_key];
  const available = section?.enable
  return (
    <React.Fragment>
      {available ? 
        <div className='mt-5 list-disc'>
        <div className='title text-lg font-bold'>
              {section?.title}
        </div>
        <div >
          {parse(`${section?.content}`)}
        </div>
        {/* <div>
          <Temp content={section?.content}/>
        </div> */}
    </div> : null  
    }
    </React.Fragment>
    
  )
}

export default SectionPreview