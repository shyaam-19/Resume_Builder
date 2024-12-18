import React from 'react'
import '../styledComponent/404Page.css'

function Error404Page() {
    return (
        <>
            <div className="error">404</div>
            <br /><br />
            <span className="info">File not found</span>
            <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" alt='error 404' className="static" />
        </>
    )
}

export default Error404Page
