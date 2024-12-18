import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

function Logout() {
    
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    removeCookie('email');
    removeCookie('token');
    toast.success('Logging out sucessfully')
    navigate('/'); // Redirect to homepage after logout
  }, [navigate, removeCookie]); // Dependencies to ensure the effect runs once

  return (
    <React.Fragment>
      <div className='w-full h-full flex items-center content-center'>
        <Loader2/> {/* Display a message while processing logout */}
      </div>
    </React.Fragment>
  );
}

export default Logout;

