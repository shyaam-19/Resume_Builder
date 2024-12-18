import React, { useState } from 'react'
// import Person2Icon from '@mui/icons-material/Person2';
import { Avatar, Button, Typography, InputAdornment,InputBase } from '@mui/material'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth,provider } from '../firebase/FirebaseGoogleAuth.jsx';
import { signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { useCookies } from 'react-cookie';
import '../styledComponent/signIn.css'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { load } from 'dotenv';

function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading,setloading] = useState(false);
  const [cookies, setCookie] = useCookies(['user'])
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();



  const onChangehandle = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  
  const onSubmitHandle = async (event) => {
    
    event.preventDefault();
    // console.log(formData);
    try {
      setloading(true);
      const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`, formData);
      
      console.log(res);
      if(res.data.success===true){

        toast.success(`Login sucessfully to ${formData.email}`);

        if(!cookies.email){
          
          setCookie('token', res.data.token, { path: '/' ,expires : new Date(Date.now()+28800000)});
          setCookie('email',formData.email,{ path: '/' ,expires : new Date(Date.now()+28800000)});
        }
        setloading(false);
        navigate('/');

      }else{
        setloading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
        setloading(false);
        toast.error('something went wrong...')
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleLoginWithGoogle = async()=>{
    try {
      setloading(true);
      const result = await signInWithPopup(auth,provider);
      // console.log(result)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token =credential.accessToken;
      
      const userPassword = result.user.email+result.user.displayName.split(' ')[0];
      const userDetails = {
        firstName: result.user.displayName.split(' ')[0],
        lastName: result.user.displayName.split(' ')[1],
        email: result.user.email,
        password: userPassword,
        confPassword: userPassword,
        profilePhoto: result.user.photoURL
      }

        await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`, userDetails);
        
        const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/login`,{
          email : result.user.email,
          password : userPassword
        });
       
        setCookie('token', res.data.token, { path: '/' ,expires : new Date(Date.now()+28800000)});
        setCookie('email',result.user.email,{ path: '/' ,expires : new Date(Date.now()+28800000)});
        setloading(false);
        toast.success(`Login Sucessfully to ${result.user.email}`); 
        navigate('/'); 
      
      

    } catch (error) {
      toast.error('something went wrong...')
      console.log(error);
    }

  }


  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandle}>
        <div className='flex justify-center items-center w-screen h-screen'>
          <div className='grid col-span-2 shadow-lg w-[400px] mt-10 bg-slate-50  border-t-[20px] rounded-md border-[#440CCC]'>
            <div className='col-span-2 text-center py-4 text-2xl text-[#440CCC]'>
              Sign In
            </div>
            <div className='col-span-2 py-4 text-2xl '>
              <Avatar className='m-auto'/>
            </div>
            <div className='col-span-2 text-sm px-5 pb-2'>
              Email
            </div>
            <div className='col-span-2 px-5'>
            <InputBase className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'
                    placeholder='email'
                    variant="standard"
                    label="Email Id"
                    name='email'
                    value={formData.email}
                    required
                    fullWidth
                    onChange={onChangehandle}
                  ></InputBase>
            </div>

            <div className='col-span-2 text-sm px-5 pt-6 pb-2'>
              Password
            </div>
            <div className='col-span-2 px-5'>
            <InputBase className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'
                    placeholder='Password'
                    variant="standard"
                    label="Password"
                    name='password'
                    value={formData.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <div className='cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}}>
                          {
                             showPassword ?
                             <EyeOffIcon/> : 
                             <EyeIcon/>  
                          }
                        </div>
                      </InputAdornment>
                    }
                    required
                    fullWidth
                    onChange={onChangehandle}
                    type={showPassword ? 'text' : 'password'}
                  ></InputBase>
            </div>
            <div className='col-span-2 mt-10 mx-5'>
            <Button className='hovercss' disabled={loading} variant="contained" color="primary" type="submit" fullWidth>
               {loading? <Loader2 className='animate-spin' color='white'/> : 'SIGN In'}
            </Button>
            </div>
            <div className='col-span-2 text-end px-5 py-2'>
              <div className='text-sm text-blue-400 cursor-pointer' onClick={()=>{navigate('/signup')}}>
                Don't have account? SignUp
              </div>
            </div>
            <div className='col-span-2 mt-5 mx-5'>
              <div className='border-black border-[1px] border-dotted'>
              </div>
            </div>
            <div className='col-span-2 mx-5 mt-2 mb-5'>
            <div style={{textAlign:'center'}}>
                <Typography sx={{marginBottom:'15px'}}>or</Typography>
                <button type="button" className="login-with-google-btn" onClick={handleLoginWithGoogle} >
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>

        </div>
      </form >
    </React.Fragment >
  )
}

export default SignIn
