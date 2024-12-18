import React,{useEffect, useState}from 'react'
import {AppBar,
        Toolbar,
        Button,
        Stack,
        Avatar,
        Drawer,
        IconButton, 
        Box,
        ListItemButton,
        ListItem,
        List,
        ListItemText,
        Accordion,
        AccordionSummary,
        AccordionDetails,
        Divider} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import '../styledComponent/header.css'
import { useNavigate  } from 'react-router-dom';
import MenuCard from '../uiComponent/MenuCard.jsx';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';

function Header() {

    const navigate = useNavigate();
    const [cookies, setCookie,removeCookie] = useCookies(['user']);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isLogin = cookies.email ? true : false;
    const [image, setImage] = useState(null);

    let fisrtLetter = 'A';
     if(isLogin){
        fisrtLetter=cookies.email[0];
        fisrtLetter=fisrtLetter.toUpperCase();
        // console.log(fisrtLetter)
     }

    useEffect(() => {
        import(`../letters_digits_jpeg/char_${fisrtLetter}.jpeg`)
        .then((img) => setImage(img.default))
        .catch((err) => console.error(err));
    }, []);

    

    const routeToSignIn = () =>{
        isLogin ? 
            navigate('/logout') :
            navigate('/signin');
    }

    const routeToHomePage = ()=>{
        navigate('/');
    }

    const routeToDashboard = ()=>{
        navigate('/dashboard');
    }

    const toggleDrawer = (open) => (event) => {
        if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
        setDrawerOpen(open);
    };

    const handleAccordionToggle = () => {
        setExpanded(!expanded);
    };

    const buildResumeButtonMenuList = {
        'Build your resume' : '/dashboard',
        'Sample resume' : '##'
    };

    const avtarMenuList = {
        'Profile' : '#',
        'Logout' : '/logout'
    };

  return (
    <>
      <AppBar className='appbar' id='appbar' position='static'>
        {!isTabletOrMobile ? 
        <Toolbar>

            <div className='logoDiv'>
                <Button id='logoButton' onClick={routeToHomePage}>
                CV.com
            </Button>
            </div>
            

            <Stack direction='row' spacing={3} style={{marginRight:'25px'}}>             
                
                <MenuCard right='false' btnName={<button className='btn1'>Build Resume</button>} list = {{...buildResumeButtonMenuList}}></MenuCard>


                <Button id='parserButton'>
                    Parse Resume
                </Button>
                {
                    isLogin?
                    <Button className='hovereffect' onClick={routeToDashboard}>
                                DashBoard
                            </Button>:
                            <></>
                }
                {
                    isLogin ? 
                        <MenuCard right='true' btnName={<Avatar alt="" src={image}/>} list = {{...avtarMenuList}}></MenuCard>  :

                            <Button className='hovereffect' onClick={routeToSignIn}>
                                Login
                            </Button>
                }

            </Stack>

        </Toolbar> :
        <Toolbar>

            <div className='logoDiv'>
                <Button id='logoButton' onClick={routeToHomePage}>
                CV.com
                </Button>
            </div>

            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            
                    
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 'auto'}}
                    role="presentation"
                >
                    <Toolbar>
                    <div className='logoDiv'>
                        <Button id='logoButton' onClick={routeToHomePage}>
                            CV.com
                        </Button>
                        
                    </div>
                    {!drawerOpen ? <></> : 
                        <>
                            <IconButton
                                onClick={toggleDrawer(false)} 
                                edge="start"
                                color="inherit">
                                    <CancelOutlinedIcon/>
                            </IconButton>
                        </>
                    }
                    </Toolbar>
                    
                    <List>
                        {/* Expandable button with sub-options */}
                        <Accordion sx={{boxShadow:'none',paddingLeft:'0px'}} expanded={expanded} onChange={handleAccordionToggle}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{paddingLeft:'30px', textTransform : 'none'}}
                        >
                            <div style={{fontSize: '17px',fontWeight:'500'}}>
                                Build Resume
                            </div>
                            
                        </AccordionSummary>
                        <AccordionDetails sx={{}}>
                            <List sx={{marginLeft:'0px',padding:'0px'}}>
                            <ListItem sx={{marginLeft:'0px',padding:'0px'}}>
                                <ListItemButton onClick={() => alert('Sub-option 1 clicked')}>
                                <ListItemText primary="Build Your resume" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem sx={{marginLeft:'0px',padding:'0px'}}>
                                <ListItemButton onClick={() => alert('Sub-option 2 clicked')}>
                                <ListItemText primary="Sample resume" />
                                </ListItemButton>
                            </ListItem>
                            </List>
                        </AccordionDetails>
                        </Accordion>

                        {/* Regular buttons */}
                        <div>
                            <Button  className='mbtn' onClick={routeToSignIn}>
                                <div style={{width:'100%',textAlign:'left'}}>
                                parse resume
                                </div>
                            </Button>
                        </div>
                            {isLogin ? 
                                <>
                                    <Button  className='mbtn' onClick={routeToDashboard}>
                                        <div style={{width:'100%',textAlign:'left'}}>
                                        DashBoard
                                        </div>
                                    </Button>
                                    <Divider />
                                    <Button  className='mbtn' >
                                        <div style={{width:'100%',textAlign:'left'}}>
                                        Profile
                                        </div>
                                    </Button>
                                    <Button  className='mbtn' onClick={()=>{navigate('/logout')}}>
                                        <div style={{width:'100%',textAlign:'left'}}>
                                        Sign out
                                        </div>
                                    </Button>
                                </>
                                 : 
                            <Button className='mbtn' onClick={routeToSignIn}>
                                <div style={{width:'100%',textAlign:'left'}}>
                                Log In
                                </div>
                            </Button>
                                    
                            }
        
                    </List>
                </Box>
            </Drawer>
        </Toolbar>
        }



      </AppBar>
    </>
  )
}

export default Header
