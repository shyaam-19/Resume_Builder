import { EllipsisVertical, Loader2, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, Popover, Slide, TextField } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function ResumeNameCard(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('')
    const [cookies, setCookie,removeCookie] = useCookies(['email']);
    const [load, setLoader] = useState(false)
    const [error, setError] = useState('');
    const [deleteLoader,setDeleteLoader] = useState(false);

    const name = props.name.resumeName;
    const id = props.name.resumeId;
    const resumeList = props.resumeList;
    const setResumeList = props.setResumeList


    const navigate = useNavigate();
    const handlePopoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'simple-popover' : undefined;

    const onRenamed = async()=>{
        try {
            setLoader(true);
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/renameresume`,{
                email : cookies.email,
                resumeId : id,
                newName : resumeTitle
            });
            let list = resumeList;
            for(let i=0;i<list.length;i++){
                if(list[i].resumeId===id){
                    list[i].resumeName=resumeTitle;
                }
            }
            setResumeList(list);
            setLoader(false);
            setOpenDialog(false);
            setResumeTitle('');
        } catch (error) {
            
        }
    }

    const onDelete = async()=>{
        try {
            handlePopoverClose();
            setDeleteLoader(true);
            const res =  await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/deleteresume`,{
                email : cookies.email,
                resumeId : id
            });
            let list = resumeList;
            let ind;
            for(let i=0;i<list.length;i++){
                if(list[i].resumeId===id){
                    // list[i].resumeName=resumeTitle;
                    ind = i;
                    break;
                }
            }
            list.splice(ind,1);
            setResumeList(list);
            setDeleteLoader(false);
        } catch (error) {
            setDeleteLoader(false);
        }
    }

    return (
        <div>
            <div className='group bg-red-600 w-[200px] mr-4 mb-5 border shadow-md rounded-md hover:w-[210px] hover:shadow-lg transition-all cursor-pointer'>
                <div className=' mt-2 w-full h-[250px] rounded-sm bg-gradient-to-b from-blue-100 to-[#440CCC] flex justify-center items-center
                            transition-all group-hover:h-[260px]' onClick={
                        () => {
                            navigate(`/dashboard/resume/${id}/edit`)
                        }
                    }>
                        {
                            deleteLoader ? <Loader2 className='animate-spin'/> :<Notebook />
                        }
                    
                </div>
                <div className='py-1 px-1 text-white flex justify-between'>
                    <div >
                        {name}
                    </div>
                    <div aria-describedby={popoverId} onClick={handlePopoverClick}>
                        <EllipsisVertical />
                    </div>
                    <Popover
                        id={popoverId}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <div style={{ padding: '10px' }}>
                            <div className='my-2 px-2 cursor-pointer' onClick={()=>{
                                handlePopoverClose();
                                setOpenDialog(true);
                            }}>
                                Rename
                            </div>
                            <hr></hr>
                            <div className='mt-2 px-2 cursor-pointer' onClick={onDelete}>
                                Delete
                            </div>
                        </div>
                    </Popover>

                </div>
                <Dialog
                    open={openDialog}
                    maxWidth='sm'
                    fullWidth
                    TransitionComponent={Transition}
                    onClose={() => { setOpenDialog(false) }}
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
                            onChange={(e) => {
                                setResumeTitle(e.target.value)
                                setError('');
                            }
                            }
                        >
                        </TextField>
                        {error !== '' ?
                            <div className='text-red-600 text-xs'>
                                {error}
                            </div> :
                            <div></div>}
                    </DialogContent>
                    <DialogActions>
                        <Button className='btn1 font-medium' onClick={() => { 
                            setLoader(false);
                            setOpenDialog(false) 
                        }} >Cancel</Button>
                        <Button
                            className='hovereffect'
                            disabled={load}
                            onClick={onRenamed}
                        >{load ? <Loader2 className='animate-spin' /> : 'Rename'}</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}

export default ResumeNameCard