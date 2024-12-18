import {  Loader2, PlusSquare } from 'lucide-react'
import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
// import '.../styledComponent/addResume.css'
import '../styledComponent/addResume.css'
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle,setResumeTitle] = useState('')
  const [cookies, setCookie,removeCookie] = useCookies(['user']);
  const [load,setLoader] = useState(false)
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const onCreate = async()=>{
    try {
        const uuid = uuidv4();
        console.log(resumeTitle,uuid);
        
        setLoader(true);
        if(resumeTitle.length===0){
            setError('Resume Title cannot be empty');
            console.log('Resume Title cannot be empty')
            setLoader(false);
        }else{
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/addresumeid`, {
                resumeId:uuid,
                resumeName:resumeTitle,
                email:cookies.email
            });
            setLoader(false);
            // console.log(res);
            setOpenDialog(false);
            navigate(`/dashboard/resume/${uuid}/edit`)
            setResumeTitle('');
        }
        
        
    } catch (error) {
        setLoader(false);
        toast.error('Network Error')
        console.log(error);
    }
    
  }

  return (
    <div>
        <div className='w-[200px] mr-4 mb-5 h-[250px] border shadow-md flex items-center justify-center 
        bg-secondary hover:shadow-lg hover:w-[215px] hover:h-[265px] transition-all hover:cursor-pointer
        bg-gradient-to-b from-blue-100 to-[#440CCC]' onClick={()=>{setOpenDialog(true)}}>
            <PlusSquare/>
        </div>

        <Dialog
            open={openDialog}
            maxWidth='sm'
            fullWidth
            TransitionComponent={Transition}
            onClose={()=>{setOpenDialog(false)}}
            aria-describedby="alert-dialog-slide-description"
        >
  
            <DialogContent>
            <div className='text-xl font-medium mb-[2px]'>{"Create Your Resume"}</div>
             <p className="text-base font-normal">
                Add title for your your new AI resume
            </p>
            <TextField
              fullWidth
              margin="dense"
              placeholder='ex. Full Stack Resume'
              onChange={(e)=>{
                setResumeTitle(e.target.value)
                setError('');
              }
            }          
            >
            </TextField>
            {error!=='' ? 
            <div className='text-red-600 text-xs'>
                {error}
            </div> : 
            <div></div>}
            </DialogContent>
            <DialogActions>
            <Button className='btn1 font-medium' onClick={()=>{setOpenDialog(false)}} >Cancel</Button>
            <Button 
                className='hovereffect' 
                disabled={load}
                onClick={onCreate} 
            >{ load? <Loader2 className='animate-spin'/>:'Create'}</Button>
            </DialogActions>
        </Dialog>

    </div>
  )
}

export default AddResume;