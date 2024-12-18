import React from 'react'

function SummeryPreview({resumeInfo}) {
  return (
    <div className='text-xs'>
        {resumeInfo?.summery}
    </div>
  )
}

export default SummeryPreview;