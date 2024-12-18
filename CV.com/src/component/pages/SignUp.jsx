import { Avatar, Button, Card, CardContent, Grid, TextField, Typography, InputAdornment, IconButton, Link,CircularProgress,InputBase } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import '../styledComponent/signIn.css'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';

function SignUp() {

    const [loading, setloading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confPassword:'',
        profilePhoto: 'www.a1.com'
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);


    const onChangehandle = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setloading(true);
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`, formData);
            setloading(false);
            console.log(res);
            if (res.status === 200) {
                toast.success(res.data.message,{
                    style : {
                        border: '1px solid #ffffff',
                        padding: '16px',
                        background : '#97BE5A',
                        color:'#ffffff'
                    },
                    iconTheme:{
                        primary : '#ffffff',
                        secondary : '#97BE5A'
                    }
                });
                navigate('/signin');
            }
            else {
                event.preventDefault();
                toast.error(res.data.message,
                    {
                        style : {
                            border: '1px solid #FF0000',
                            padding: '16px',
                            background : '#FF0000',
                            color:'#ffffff'
                        },
                        iconTheme:{
                            primary : '#ffffff',
                            secondary : '#FF0000'
                        }

                });
                // console.log(res.data.error);
            }
        } catch (error) {
            // console.log(error.response);
            event.preventDefault();
            if(error.response.status===406){
                toast.error(error.response.data,
                    {
                        style : {
                            border: '1px solid #FF0000',
                            padding: '16px',
                            // fontSize: '15px',
                            background : '#FF0000',
                            color:'#ffffff'
                        },
                        iconTheme:{
                            primary : '#ffffff',
                            secondary : '#FF0000'
                        }

                }
                )

            }else{
                toast.error('something went wrong',
                {
                    style : {
                        border: '1px solid #FF0000',
                        padding: '16px',
                        // fontSize: '15px',
                        background : '#FF0000',
                        color:'#ffffff'
                    },
                    iconTheme:{
                        primary : '#ffffff',
                        secondary : '#FF0000'
                    }

            }
                )
            }
            setloading(false);
        }
    };


    return (
        <React.Fragment>

                <form onSubmit={handleSubmit}>
                    {/* <Card className='card' sx={{ maxWidth: '400px', backgroundColor: '#FFFFFC' }}>
                        <CardContent>

                            <Typography variant='h4' sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '20px'
                            }}>Sign Up</Typography>

                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                <Avatar sx={{ height: 64, width: 64 }}>
                                    <Person2Icon />
                                </Avatar>
                            </div>


                            <Grid container rowSpacing={4} columnSpacing={2}>

                                <Grid item xs={6}>
                                    <TextField
                                        variant="standard"
                                        label="First Name"
                                        name='firstName'
                                        value={formData.firstName}
                                        required
                                        fullWidth
                                        onChange={handleChange}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        variant="standard"
                                        label="Last Name"
                                        name='lastName'
                                        value={formData.lastName}
                                        required
                                        fullWidth
                                        onChange={handleChange}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        label="Email Id"
                                        name='email'
                                        value={formData.email}
                                        required
                                        fullWidth
                                        onChange={handleChange}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        label="Password"
                                        name='password'
                                        value={formData.password}
                                        required
                                        fullWidth
                                        type='password'
                                        onChange={handleChange}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        label="Confirm Password"
                                        name='confPassword'
                                        value={formData.confPassword}
                                        required
                                        fullWidth
                                        onChange={handleChange}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment:
                                                < InputAdornment position="end" >
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>

                                        }}
                                    ></TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button className='hovercss' variant="contained" color="primary" type="submit" fullWidth>
                                            SIGN UP
                                        </Button>
                                    </div>
                                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'end' }}>
                                        <Link href="/signin" underline="hover">already have account?SignIn</Link>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <p style={{ fontWeight: 50 }}>Copyright © CV.com 2024</p>
                                    </div>

                                </Grid>

                            </Grid>

                        </CardContent>

                    </Card> */}

                    <div className='flex justify-center items-center w-screen h-screen'>
                        <div className='grid col-span-2 shadow-lg w-[400px] mt-10 bg-slate-50  border-t-[20px] rounded-md border-[#440CCC]'>
                            <div className='col-span-2 text-center py-4 text-2xl text-[#440CCC]'>
                                Sign Up
                            </div>
                            <div className='col-span-2 py-4 text-2xl '>
                            <Avatar className='m-auto'/>
                            </div>
                            <div className='col-span-1 text-sm pl-5 pr-2 pb-2'>
                                First Name
                            </div>
                            <div className='col-span-1 text-sm pr-5 pb-2'>
                                Last Name
                            </div>
                            <div className='col-span-1 pl-5 pr-2 mb-5'>
                            <InputBase className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'
                                    placeholder='First Name'
                                    variant="standard"
                                    label="firstName"
                                    name='firstName'
                                    value={formData.firstName}
                                    required
                                    fullWidth
                                    onChange={onChangehandle}
                                ></InputBase>
                            </div>

                            <div className='col-span-1 pr-5'>
                            <InputBase className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'
                                    placeholder='Last Name'
                                    variant="standard"
                                    label="Last Name"
                                    name='lastName'
                                    value={formData.lastName}
                                    required
                                    fullWidth
                                    onChange={onChangehandle}
                                ></InputBase>
                            </div>

                            <div className='col-span-2 text-sm px-5 pb-2'>
                                Email
                            </div>
                            <div className='col-span-2 px-5 mb-5'>
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
                            <div className='col-span-2 text-sm px-5 pb-2'>
                                Password
                            </div>
                            <div className='col-span-2 px-5'>
                                <InputBase className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'
                                        placeholder='Password'
                                        variant="standard"
                                        label="Password"
                                        name='password'
                                        value={formData.password}
                                        required
                                        fullWidth
                                        onChange={onChangehandle}
                                        type='password'
                                    ></InputBase>
                            </div>
                            <div className='col-span-2 text-sm px-5 pt-5 pb-2'>
                               Confirm Password
                            </div>
                            <div className='col-span-2 px-5'>
                                <InputBase className='border-[2px] border-black p-1 px-3 w-full h-[50px] rounded-md focus-within:border-[#440CCC]'
                                        placeholder='Confirm Password'
                                        variant="standard"
                                        label="confPassword"
                                        name='confPassword'
                                        value={formData.confPassword}
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
                                    {loading ? <Loader2 className='animate-spin' color='white'/>  : 'SIGN Up'}
                                </Button>
                            </div>
                            <div className='col-span-2 text-end px-5 py-2 mb-5'>
                                <div className='text-sm text-blue-400 cursor-pointer' onClick={()=>{navigate('/signin')}}>
                                    already have an account?SignIn
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

        </React.Fragment>
    )
}

export default SignUp
