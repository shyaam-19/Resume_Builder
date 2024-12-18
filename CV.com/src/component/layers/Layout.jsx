import React,{useEffect, useState} from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
// import { CircularProgress } from '@mui/material'
import {Toaster} from 'react-hot-toast'
import Home from '../pages/Home.jsx'
import SignIn from '../pages/SignIn.jsx'
import Error404Page from '../pages/Error404Page.jsx'
import SignUp from '../pages/SignUp.jsx'
import Logout from '../pages/Logout.jsx'
import { Route, Routes,useLocation } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard.jsx'
import { useCookies } from 'react-cookie'
import EditResume from '../pages/dashboard/resume/[resumeId]/edit/index.jsx'
// import 

function Layout() {

    const location = useLocation();
    let width = window.innerWidth;
    // console.log(width);
    const [cookies, setCookie,removeCookie] = useCookies(['email']);
    const [isLogin,setIsLogin] = useState(false);
      useEffect(()=>{
        if(cookies.email){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
      },[cookies])

    return (
        <React.Fragment>
            <div style={{width:width*0.99}}>
                <Header key={location.pathname === '/' ? Date.now() : 'static-key'}/>
                {/* <ToastContainer/> */}
                <div>
                        <Toaster/>
                        <div>
                            <Routes>
                                <Route exact path='/' element={<Home/>}/>
                                <Route exact path='/signin' element={<SignIn/>}/>
                                <Route exact path='/signup' element={<SignUp/>}/>
                                <Route exact path = '/logout' element={isLogin ? <Logout/> : <SignIn/>}/>
                                <Route exact path ='/dashboard/resume/:resumeId/edit' element={isLogin?<EditResume/> : <SignIn/>}/>
                                <Route exact path='/dashboard' element={isLogin ? <Dashboard/> : <SignIn/>}/>
                                <Route exact path='*' element={<Error404Page/>}/>
                            </Routes>
                        </div>
                </div>   
                <Footer/>
            </div>
        </React.Fragment>
    )
}

export default Layout
